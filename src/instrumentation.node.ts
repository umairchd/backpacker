import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { FetchInstrumentation } from "opentelemetry-instrumentation-fetch-node";

const traceExporter = new OTLPTraceExporter();

const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]:
      process.env.OTEL_SERVICE_NAME ?? "backpackerdeals-next",
  }),
  spanProcessor: new SimpleSpanProcessor(traceExporter),
  traceExporter,
  instrumentations: [
    getNodeAutoInstrumentations({
      // only instrument fs if it is part of another trace
      "@opentelemetry/instrumentation-fs": {
        enabled: false,
      },
      "@opentelemetry/instrumentation-http": {
        ignoreIncomingRequestHook: (request) => {
          const url = new URL(request.url, `http://${request.headers.host}`);

          // ignore healthcheck
          if (url.pathname.includes("/healthcheck")) {
            return true;
          }
          return false;
        },
      },
    }),
    new FetchInstrumentation({}),
  ],
});
sdk.start();
