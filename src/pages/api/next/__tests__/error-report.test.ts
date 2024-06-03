/**
 * @jest-environment node
 */
import errorReportHandler from "../error-report.page";
import httpMocks from "node-mocks-http";

describe("error-report", () => {
  it("should return OK", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      body: JSON.stringify({
        message: "an error occurred",
        source: "source",
        lineno: 1,
        colno: 1,
        error: "Error",
        location: "/test/test",
      }) as any,
    });
    const response = httpMocks.createResponse();
    await errorReportHandler(request as any, response as any);
    expect(response._getStatusCode()).toBe(200);
    expect(response._getData()).toContain("success");
  });
});
