import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import flatten from "flatten";
import { PrimaryButton } from "../styledcomponents/button/button";
import { Input, Form, Select } from "antd";
import { FlexContainer } from "../styledcomponents/container/FlexGrid";

export default class FormGenerator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: { ...props.defaultValues },
      inputs: { ...props.inputs },
      canRender: [],
      validationErrors: {},
      randomisedFields: {}
    };

    this.filterRules = {
      numeric: value => /^$|^[0-9]+$/.test(value),
      decimal: value => /^$|^[\d.]+$/.test(value)
    };

    this.transformerRules = {
      uppercase: value => value.toUpperCase(),
      lowercase: value => value.toLowerCase()
    };

    this.validationRules = {
      required: value => {
        if (typeof value === "object") {
          value = Object.keys(value);
        }

        if (typeof value === "string" || Array.isArray(value)) {
          return !!value.length;
        }

        return value !== null && value !== undefined;
      },
      email: value =>
        !value ||
        /^$|^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        ),
      decimal: value => !value || /^$|^\d+$|^\.\d+|^\d+\.\d+$/.test(value)
    };

    this.validateForm = this.validateForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.propagateChange = this.propagateChange.bind(this);
  }

  static flatInputs(entity) {
    return flatten(entity);
  }

  static getDerivedStateFromProps({ form }, state) {
    const { form: values, validationErrors: errors, randomisedFields } = state;
    const inputs = FormGenerator.flatInputs(form);

    const newRandomisedFields = { ...randomisedFields };
    const newValues = { ...values };
    const newErrors = { ...errors };
    const canRender = [];

    inputs.forEach(({ name, renderIf, autocomplete }) => {
      if (typeof renderIf === "function" && !renderIf(state)) {
        delete newValues[name];
        delete newErrors[name];
      } else {
        canRender.push(name);
      }

      if (autocomplete === false) {
        if (!newRandomisedFields[name]) {
          newRandomisedFields[name] = Math.random()
            .toString(36)
            .substring(7);
        }

        return;
      }

      delete newRandomisedFields[name];
    });

    return {
      ...state,
      inputs: form,
      canRender: canRender,
      form: newValues,
      validationErrors: newErrors,
      randomisedFields: newRandomisedFields
    };
  }

  componentDidUpdate(prevProps) {
    const { values: ppValues } = prevProps;
    const { values: pValues } = this.props;

    if (pValues) {
      if (JSON.stringify(pValues) !== JSON.stringify(ppValues)) {
        const form = {
          ...ppValues,
          ...pValues
        };

        this.propagateChange(form);
      }
    }

    return null;
  }

  applyFilter(event, filter) {
    switch (filter.constructor) {
      case RegExp:
        return filter.test(event.target.value);
      case Function:
        return filter(event);
      case String:
        //Might be regex if it has been stored as JSON
        if (filter[0] === "/" && filter[filter.length - 1] === "/") {
          const regex = new RegExp(filter.substring(1, filter.length - 1));

          return regex.test(event.target.value);
        }

        try {
          return this.filterRules[filter](event.target.value);
        } catch (e) {
          console.error(
            `Invalid filter rule ${filter} used on input ${event.target.name}`
          );

          return true;
        }
      default:
        console.error(
          `Invalid filter type of ${filter.constructor} on input ${event.target.name}`
        );

        return true;
    }
  }

  applyTransformer(event, transformer) {
    switch (transformer.constructor) {
      case Function:
        return transformer(event);
      case String:
        return this.transformerRules[transformer](event.target.value);
      default:
        console.error(
          `Invalid transformer type of ${transformer.constructor} on input ${event.target.name}`
        );

        return event.target.value;
    }
  }
  validateInput(name, value, rules) {
    let valid = true;
    let errorMessage = null;

    if (!Array.isArray(rules)) {
      rules = [rules];
    }

    rules.forEach(rule => {
      let ruleMessage = null;

      if (rule.constructor === Object) {
        ruleMessage = rule.message;
        rule = rule.rule;
      }

      switch (rule.constructor) {
        case Function:
          if (!rule(name, value)) {
            errorMessage = ruleMessage;
            valid = false;
          }

          break;
        case RegExp:
          if (!rule.test(value)) {
            errorMessage = ruleMessage;
            valid = false;
          }

          break;
        case String:
          //Might be regex if it has been stored as JSON
          if (rule[0] === "/" && rule[rule.length - 1] === "/") {
            const regex = new RegExp(rule.substring(1, rule.length - 1));

            if (!regex.test(value)) {
              errorMessage = ruleMessage;
              valid = false;

              break;
            }
          }

          try {
            if (!this.validationRules[rule](value)) {
              errorMessage = ruleMessage;
              valid = false;
            }
          } catch (e) {
            console.error(`Invalid filter rule ${rule} used on input ${name}`);
          }

          break;
        default:
          console.error(
            `Invalid validation type of ${rule.constructor} on input ${name}`
          );
      }
    });

    const validationError = {
      [name]: valid ? false : errorMessage || true
    };

    return [valid, validationError];
  }

  applyValidation(event, validation, onlyValid = false) {
    let { validationErrors } = this.state;
    let [valid, validationError] = this.validateInput(
      event.target.name,
      event.target.value,
      validation
    );

    validationErrors = {
      ...validationErrors,
      ...validationError
    };

    if ((onlyValid && valid) || !onlyValid) {
      this.setState({
        validationErrors
      });
    }

    return validationErrors;
  }

  propagateChange(form, validationErrors) {
    const { onChange } = this.props;

    const callback = () => {
      const [valid, errors] = this.validateForm(false);

      validationErrors = errors || validationErrors;

      onChange({
        valid,
        data: {
          form,
          validationErrors
        }
      });
    };

    this.setState({ form: { ...form } }, callback);
  }

  handleInput(input, event) {
    event.persist();
    clearTimeout(this.timer);

    let validationErrors = {};

    if (input.filter && !this.applyFilter(event, input.filter)) {
      return;
    }

    let value = event.target.value;

    if (input.type === "checkbox") {
      value = event.target.checked;
    }

    if (input.transformer && input.transformer.onChange) {
      value = this.applyTransformer(event, input.transformer.onChange);
    }

    if (input.validationRules) {
      const { validationTimeout } = this.props;

      // The third parameter, true, means that the input will not show as invalid
      // while the user is typing
      validationErrors = this.applyValidation(
        event,
        input.validationRules,
        true
      );

      this.timer = setTimeout(
        () => this.applyValidation(event, input.validationRules),
        validationTimeout
      );
    }

    let { form } = this.state;

    form[input.name] =
      value && typeof value === "object" && !Array.isArray(value)
        ? value.value
        : value;

    this.propagateChange(form, validationErrors);
  }

  handleBlur(input, event) {
    clearTimeout(this.timer);

    let { form } = this.state;

    let value = event.target.value;
    let validationErrors = {};

    if (input.transformer && input.transformer.onBlur) {
      value = this.applyTransformer(event, input.transformer.onBlur);
    }

    if (input.validationRules) {
      validationErrors = this.applyValidation(event, input.validationRules);
    }

    if (form[input.name] !== value) {
      form[input.name] = value;

      this.propagateChange(form, validationErrors);
    }
  }

  validateForm(display = true) {
    const { form } = this.props;

    let invalid = false;
    let { validationErrors, form: stateForm } = this.state;

    flatten(form).forEach(input => {
      if (!input.validationRules) {
        return;
      }

      let [valid, validationError] = this.validateInput(
        input.name,
        stateForm[input.name],
        input.validationRules
      );

      validationErrors = {
        ...validationErrors,
        ...validationError
      };

      if (!valid) {
        invalid = true;
      }
    });

    if (display) {
      this.setState({
        validationErrors
      });

      return [!invalid, validationErrors];
    }

    return [!invalid, validationErrors];
  }

  getInputValidationError(inputName) {
    const { validationErrors } = this.state;
    const { formErrors } = this.props;

    const validationError = validationErrors[inputName];
    const propError = formErrors[inputName];

    return validationError && validationError !== true
      ? validationError
      : propError;
  }

  submitForm() {
    const { form } = this.state;
    const { onSubmit } = this.props;
    // const { renderSubmit } = this.props;
    const value = [];
    // for(let i=0;i<form.s)
    // console.log(form);

    if (onSubmit) {
      // const { renderSubmit } = this.props;
      let [valid, validationErrors] = this.validateForm();

      onSubmit({
        valid: valid,
        data: {
          form,
          validationErrors
        }
      });
      this.setState({
        form: {}
      });
      // renderSubmit({
      //   valid: valid,
      //   data: {
      //     form,
      //     validationErrors
      //   }
      // });
    }
  }

  renderCustomInput(input) {
    const { form } = this.state;

    if (typeof input.render !== "function") {
      if (!React.isValidElement(input.render)) {
        return input.render;
      }

      return React.cloneElement(input.render, {
        name: input.name,
        placeholder: input.placeholder,
        value: form[input.name] || "",
        onChange: this.handleBlur.bind(this, input),
        onBlur: this.handleBlur.bind(this, input),
        invalid: !!this.getInputValidationError(input.name) || undefined
      });
    }

    return input.render(
      input,
      form[input.name] || "",
      this.handleInput.bind(this, input),
      this.handleBlur.bind(this, input),
      this.getInputValidationError(input.name),
      this.state
    );
  }

  renderInput(input) {
    if (input.constructor === Array) {
      return this.renderInputs(input);
    }

    const { form, validationErrors, randomisedFields } = this.state;

    const {
      formErrors,
      classPrefix,
      defaultInputClass,
      invalidInputClass,
      validInputClass
    } = this.props;

    if (input.render) {
      return this.renderCustomInput(input);
    }
    const { inputStyle } = this.props;

    const props = {
      className: `${classPrefix}-${input.inputClass ||
        defaultInputClass ||
        ""} ${
        validationErrors[input.name] || formErrors[input.name]
          ? invalidInputClass
          : validationErrors[input.name] === false
          ? validInputClass
          : ""
      }`,
      name: randomisedFields[input.name] || input.name,
      value: form[input.name] || input.defaultValue || "",
      placeholder: input.placeholder,
      id: input.name,
      onChange: this.handleInput.bind(this, input),
      onBlur: this.handleBlur.bind(this, input),
      ...input.htmlProps
    };

    switch (input.type) {
      case "custom":
        return this.renderCustomInput(input);
      case "textarea":
        return <textarea {...props} />;
      case "checkbox":
        return (
          <input
            {...props}
            type={input.type}
            onBlur={undefined}
            defaultChecked={props.defaultValue}
            checked={props.value}
          />
        );
      case "select":
        return (
          <select
            {...props}
            style={{
              width: "80px",
              boxShadow: "1px 2px 8px 1px rgba(0,0,0,0.08)",
              borderRadius: "6px",
              height: "32px"
              // marginTop: "-10px"
            }}
          >
            {input.defaultOptionText && (
              <option hidden selected value>
                {input.defaultOptionText}
              </option>
            )}
            {(input.options || []).map(option => {
              return <option value={option.value}>{option.text}</option>;
            })}
          </select>
        );
      case "radio":
        return (
          <Fragment>
            {input.options.map((option, i) => {
              return (
                <div
                  key={i}
                  className={`${classPrefix}-${input.radioContainerClass ||
                    ""}`}
                >
                  <Input
                    name={input.name}
                    value={option.value}
                    type="radio"
                    onChange={this.handleInput.bind(this, input)}
                  />
                  <label>{option.text}</label>
                </div>
              );
            })}
          </Fragment>
        );
      default:
        return <Input type={input.type} {...props} style={inputStyle} />;
    }
  }

  renderLabel(input) {
    const { lableStyle } = this.props;
    if (!input.label) {
      return;
    }

    const { classPrefix, defaultLabelClass } = this.props;
    const props = {
      className:
        classPrefix + "-" + (input.label.className || defaultLabelClass || ""),
      htmlFor: input.name
    };

    if (typeof input.label === "function") {
      return input.label(props);
    }

    if (input.label) {
      return <label {...props}>{input.label.text || input.label}</label>;
    }
  }

  renderValidationErrors(input) {
    const { classPrefix, defaultValidationErrorClass } = this.props;
    const validationError = this.getInputValidationError(input.name);

    if (validationError) {
      return (
        <p className={`${classPrefix}-${defaultValidationErrorClass || ""}`}>
          {validationError}
        </p>
      );
    }
  }

  renderSubmitButton() {
    const {
      submitButton,
      classPrefix,
      defaultSubmitClass,
      loading
    } = this.props;

    if (submitButton) {
      return (
        <PrimaryButton
          className={`${classPrefix}-${submitButton.className ||
            defaultSubmitClass ||
            ""} ${this.validateForm(false) ? "" : "invalid"} ${
            loading ? "loading" : ""
          }`}
          onClick={this.submitForm}
        >
          {this.renderSubmitButtonContents()}
        </PrimaryButton>
      );
    }
  }

  renderSubmit = () => {
    this.submitForm();
  };

  renderSubmitButtonContents() {
    const { submitButton, loading, loadingElement } = this.props;

    if (loading && loadingElement) {
      return loadingElement;
    }

    return submitButton.text;
  }

  renderInputs(inputs) {
    const { canRender } = this.state;
    const { classPrefix, defaultContainerClass, formDriction } = this.props;

    inputs = inputs.filter(
      input => canRender.includes(input.name) || input.constructor === Array
    );
    const { lableStyle } = this.props;
    return (
      <div
        style={{
          width: "600px",
          display: "flex",
          flexDirection: formDriction,
          flexWrap: "wrap"
        }}
      >
        {inputs.map((input, i) => {
          const isArray = input.constructor === Array;
          const containerClass = isArray
            ? `${classPrefix}-row`
            : `${classPrefix}-${input.containerClass ||
                defaultContainerClass ||
                ""}`;

          return (
            <div>
              <FlexContainer style={{ height: "auto" }} key={i}>
                <Form className={containerClass}>
                  <FlexContainer home>
                    <div style={lableStyle}>
                      {!isArray && this.renderLabel(input)}
                    </div>
                    <div>{this.renderInput(input)}</div>
                    {!isArray && this.renderValidationErrors(input)}
                  </FlexContainer>
                  <div style={{ height: "10px" }}></div>
                </Form>
              </FlexContainer>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    try {
      const { inputs } = this.state;
      const { buttonStyle, formStyle } = this.props;

      return (
        <FlexContainer>
          <div style={formStyle}>{this.renderInputs(inputs)}</div>
          <div style={buttonStyle}>{this.renderSubmitButton()}</div>
        </FlexContainer>
      );
    } catch (e) {
      console.error(e);

      return <p>Error rendering form</p>;
    }
  }
}

FormGenerator.defaultProps = {
  defaultValues: {},
  values: null,
  classPrefix: "rdf",
  defaultContainerClass: "container",
  defaultInputClass: "input",
  defaultValidationErrorClass: "error-label",
  defaultLabelClass: "label",
  form: [],
  defaultSubmitClass: "submit",
  invalidInputClass: "invalid",
  validInputClass: "valid",
  loading: false,
  loadingElement: null,
  formErrors: {},
  validationTimeout: 1000,
  inputStyle: {},
  buttonStyle: {},
  formStyle: {},
  lableStyle: { width: "150px" },
  formDriction: "row",
  onChange: () => null
};

FormGenerator.propTypes = {
  defaultValues: PropTypes.object,
  values: PropTypes.object,
  defaultInputClass: PropTypes.string,
  defaultLabelClass: PropTypes.string,
  defaultContainerClass: PropTypes.string,
  defaultValidationErrorClass: PropTypes.string,
  form: PropTypes.array.isRequired,
  submitButton: PropTypes.object,
  validationTimeout: PropTypes.number,
  classPrefix: PropTypes.string,
  loading: PropTypes.bool,
  defaultSubmitClass: PropTypes.string,
  invalidInputClass: PropTypes.string,
  validInputClass: PropTypes.string,
  loadingElement: PropTypes.element,
  formErrors: PropTypes.object,
  onChange: PropTypes.func,
  inputStyle: PropTypes.object,
  buttonStyle: PropTypes.object,
  formStyle: PropTypes.object,
  formDriction: PropTypes.string,
  lableStyle: PropTypes.object,
  renderSubmit: PropTypes.func
};
