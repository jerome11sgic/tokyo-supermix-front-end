export default error => {
  console.log(error);
  const { code, message } = error;

  console.log(error.code);

  switch (code) {
    case "41000":
      console.log("plant");
      return "plant notExists";
    // do something when you're unauthenticated
    case "41001":
      return "plant is Exists";
    // do something when you're unauthorized to access a resource
    case "41002":
      // do something when your server exploded
      return "plantName is null";

    case "41003":
      // do something when your server exploded
      return "plantName is empty";

    case "41004":
      // do something when your server exploded
      return "plant id is null";
    case "41005":
      // do something when your server exploded
      return "plantName is Exists";
    case "41006":
      // do something when your server exploded
      return "plantID is Exists";
    case "42000":
      // do something when your server exploded
      return "designation is notExists";
    case "42001":
      // do something when your server exploded
      return "designation is Exists";
    case "42002":
      // do something when your server exploded
      return "designationName is null";
    case "42003":
      // do something when your server exploded
      return "designationName is Empty";
    case "42004":
      // do something when your server exploded
      return "designationName is Exists";
    case "43000":
      // do something when your server exploded
      return "supplierCategory Exist";
    case "43001":
      // do something when your server exploded
      return "supplierCategory is Empty";
    case "43002":
      // do something when your server exploded
      return "supplierCategory is null";
    case "43003":
      // do something when your server exploded
      return null;
    case "43004":
      // do something when your server exploded
      return "plant name is NotExist";
    case "45000":
      console.log("plant");
      return "supplier notExists";
    // do something when you're unauthenticated
    case "45001":
      return "Email is Exists";
    // do something when you're unauthorized to access a resource
    case "45002":
      // do something when your server exploded
      return "supplier Name is null";
    case "45003":
      // do something when your server exploded
      return "supplier Name Empty";
    case "45004":
      // do something when your server exploded
      return "supplier Email null";
    case "45005":
      // do something when your server exploded
      return "supplier Email Empty";
    case "45006":
      // do something when your server exploded
      return "supplier phoneNumber null";
    case "45007":
      // do something when your server exploded
      return "supplier phoneNumber Empty";

    case "44000":
      console.log("plant");
      return "employee notExists";
    // do something when you're unauthenticated
    case "44001":
      return "email is Exists";
    // do something when you're unauthorized to access a resource
    case "44002":
      // do something when your server exploded
      return "employee firstName is null";
    case "44003":
      // do something when your server exploded
      return "employee firstName Empty";
    case "44004":
      // do something when your server exploded
      return "employee lastName null";
    case "44005":
      // do something when your server exploded
      return "employee lastName Empty";
    case "44006":
      // do something when your server exploded
      return "employee email null";
    case "44007":
      // do something when your server exploded
      return "employee email Empty";
    case "44008":
      // do something when your server exploded
      return "employee Code null";
    case "44009":
      // do something when your server exploded
      return "employee Code Empty";

    default:
    // handle normal errors with some alert or whatever
  }
  return null;
};
