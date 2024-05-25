import React from "react";

interface ErrorFormProps {
  error: string | null;
}

const ErrorForm: React.FC<ErrorFormProps> = ({ error }) => {
  return <>{error && <p className="error_form">{error}</p>}</>;
};

export default ErrorForm;
