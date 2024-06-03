type ErroInfo = {
  message: string | Event;
  source: string;
  lineno: number;
  colno: number;
  error: any;
  location: string;
};

const reportError = async (errInfo: ErroInfo) =>
  fetch("/api/next/error-report", {
    method: "POST",
    body: JSON.stringify(errInfo),
  });

export default reportError;
