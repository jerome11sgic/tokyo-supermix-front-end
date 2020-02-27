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
    case "48001":
      // do something when your server exploded
      return "Category is Exist ";
    case "49001":
      // do something when your server exploded
      return "SubCategory is Exist ";
    case "47003":
      // do something when your server exploded
      return "Raw Material name empty";
    case "47002":
      // do something when your server exploded
      return "Raw Material name null";
    case "47001":
      // do something when your server exploded
      return "Raw Material name already exist";
    case "47000":
      // do something when your server exploded
      return "Raw Material id not exist";
    case "48003":
      // do something when your server exploded
      return "Material category name empty";
    case "48002":
      // do something when your server exploded
      return "Material Category name null";
    case "48001":
      // do something when your server exploded
      return "Material Category name already exist";
    case "48000":
      // do something when your server exploded
      return "Material Category id not exist";
    case "51000":
      // do something when your server exploded
      return "Material State name null";
    case "51001":
      // do something when your server exploded
      return "Material State name empty";
    case "51002":
      // do something when your server exploded
      return "Material State id not exist ";
    case "51003":
      // do something when your server exploded
      return "Material State already exist";
    case "52003":
      // do something when your server exploded
      return "Equipment name empty";
    case "52001":
      // do something when your server exploded
      return "Equipment name already exist";
    case "52002":
      // do something when your server exploded
      return "Equipment name null";
    case "52000":
      // do something when your server exploded
      return "Equipment id not exist";
    case "55009":
      // do something when your server exploded
      return "Plant code null";
    case "55001":
      // do something when your server exploded
      return "Serial Number already exist";
    case "55000":
      // do something when your server exploded
      return "Serial Number not exist";
    case "46005":
      // do something when your server exploded
      return "Customer email empty";
    case "46006":
      // do something when your server exploded
      return "Customer email null";
    case "46001":
      // do something when your server exploded
      return "Customer email already exist";
    case "46000":
      // do something when your server exploded
      return "Customer id not exist";
    case "65001":
      // do something when your server exploded
      return "Test type already exist";
    case "65003":
      // do something when your server exploded
      return "Test type is empty";
    case "65002":
      // do something when your server exploded
      return "Test type is null";
    case "65000":
      // do something when your server exploded
      return "Test type id not exist";
    case "62003":
      // do something when your server exploded
      return "Test name is empty";
    case "62002":
      // do something when your server exploded
      return "Test name is null";
    case "62000":
      // do something when your server exploded
      return "Test name already exist";
    case "62001":
      // do something when your server exploded
      return "Test id not exist";
    case "63003":
      // do something when your server exploded
      return "Equation formula is empty";
    case "63001":
      // do something when your server exploded
      return "Equation formula already exist";
    case "63002":
      // do something when your server exploded
      return "Equation formula is null";
    case "63000":
      // do something when your server exploded
      return "Equation id not exist";
    case "49000":
      // do something when your server exploded
      return "Material Sub Category id not exist";
    case "49001":
      // do something when your server exploded
      return "Material Sub Category already exist";
    case "49002":
      // do something when your server exploded
      return "Material Sub Category name null";
    case "49003":
      // do something when your server exploded
      return "Material Sub Category name empty";
    case "50000":
      // do something when your server exploded
      return "Unit id not exist";
    case "50001":
      // do something when your server exploded
      return "Unit already exist";
    case "50002":
      // do something when your server exploded
      return "Unit is null";
    case "50003":
      // do something when your server exploded
      return "Unit is empty";
    case "50004":
      // do something when your server exploded
      return "Special Character is not exit";
    case "54000":
      // do something when your server exploded
      return "Plant Equipment Calibration id not exit";
    case "54008":
      // do something when your server exploded
      return "Equipment Plan Id is null";
    case "54002":
      // do something when your server exploded
      return "Status is null";
    case "54003":
      // do something when your server exploded
      return "Status is empty";
    case "54004":
      // do something when your server exploded
      return "Calibrate Date is null";
    case "54005":
      // do something when your server exploded
      return "Due Date is null";
    case "54006":
      // do something when your server exploded
      return "User Id is null";
    case "54007":
      // do something when your server exploded
      return "Supplier Id is null";
    case "53000":
      // do something when your server exploded
      return "Parameter id not exist";
    case "53001":
      // do something when your server exploded
      return "Parameter already exist";
    case "53002":
      // do something when your server exploded
      return "Parameter name is null";
    case "53003":
      // do something when your server exploded
      return "Parameter name is empty";
    case "53004":
      // do something when your server exploded
      return "Parameter abbreviation is null";
    case "53005":
      // do something when your server exploded
      return "Parameter abbreviation is empty";
    case "55000":
      // do something when your server exploded
      return "Plant Equipment id not exist";
    case "55001":
      // do something when your server exploded
      return "Plant Equipment already exist";
    case "55002":
      // do something when your server exploded
      return "Plant Equipment Serial Number is null";
    case "55003":
      // do something when your server exploded
      return "Plant Equipment Serial Number is empty";
    case "55004":
      // do something when your server exploded
      return "Plant Equipment Brand name is null";
    case "55005":
      // do something when your server exploded
      return "Plant Equipment Brand name is empty";
    case "55008":
      // do something when your server exploded
      return "Plant code is null";
    case "55009":
      // do something when your server exploded
      return "Plant code is empty";

    default:
    // handle normal errors with some alert or whatever
  }
  return null;
};
