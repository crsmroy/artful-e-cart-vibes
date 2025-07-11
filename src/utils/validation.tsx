
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateIndianPhoneNumber = (phone: string): boolean => {
  // Indian phone number validation - accepts +91 or without country code
  const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
};

export const validateIndianState = (state: string): boolean => {
  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", 
    "Delhi", "Jammu and Kashmir", "Ladakh", "Chandigarh", 
    "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Puducherry", 
    "Andaman and Nicobar Islands"
  ];
  
  return indianStates.some(validState => 
    validState.toLowerCase() === state.toLowerCase()
  );
};

export const getValidationMessage = (field: string, value: string): string | null => {
  switch (field) {
    case 'email':
      return !validateEmail(value) ? 'Please enter a valid email address' : null;
    case 'phone':
      return !validateIndianPhoneNumber(value) ? 'Please enter a valid Indian phone number (10 digits starting with 6-9)' : null;
    case 'state':
      return !validateIndianState(value) ? 'Please enter a valid Indian state' : null;
    default:
      return null;
  }
};
