window.onload = function () {
  const ui = SwaggerUIBundle({
    url: "openapi.yaml", // 表示するOpenAPIファイル
    dom_id: "#swagger-ui",
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout",
    supportedSubmitMethods: [],
    defaultModelsExpandDepth: -1,
    onComplete: function () {
      const spec = ui.getSystem().specSelectors.specJson();
      const paths = spec.paths;

      // Swagger UIのDOMが描画されるまで待機
      setTimeout(() => {
        Object.entries(paths).forEach(([path, methods]) => {
          Object.entries(methods).forEach(([method, operation]) => {
            const versions = operation["x-available-version"];
            if (versions) {
              // DOM IDを生成（Swagger UIの仕様に合わせる）
              const methodId = `${method}-${path.replace(/[\/{}]/g, "-")}`.replace(/^-|-$/g, "");
              const el = document.querySelector(`#operations-${methodId}`);
              if (el) {
                const versionTag = document.createElement("div");
                versionTag.style.margin = "5px 0";
                versionTag.style.fontSize = "0.9em";
                versionTag.style.color = "#666";
                versionTag.innerHTML = `<strong>Available Versions:</strong> ${versions.join(", ")}`;
                const summaryEl = el.querySelector(".opblock-summary");
                if (summaryEl) {
                  summaryEl.appendChild(versionTag);
                }
              }
            }
          });
        });
      }, 1000); // 描画完了までの待機時間（必要に応じて調整）
    }
  });

  window.ui = ui;
};
