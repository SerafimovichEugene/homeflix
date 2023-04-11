import { Plugin } from "esbuild";
import { writeFile } from "fs/promises";
import { resolve } from "path";

const findPaths = (keysOutputs: string[]) => {
  return keysOutputs.reduce<Array<string[]>>(
    (acc, path) => {
      const [js, css] = acc;
      const splettedFileName = path.split("/").pop();

      if (splettedFileName?.endsWith(".js")) {
        js.push(splettedFileName);
      }
      if (splettedFileName?.endsWith(".css")) {
        css.push(splettedFileName);
      }

      return acc;
    },
    [[], []]
  );
};

const renderHtml = (jsPaths: string[], cssPaths: string[]): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Homeflix</title>
        ${cssPaths?.map((path) => `<link rel="stylesheet" href="/${path}" />`).join("\n\t\t")}
      </head>
      <body>
        <div id="root"></div>
        ${jsPaths?.map((path) => `<script src=/${path}></script>`).join("\n\t\t")}
      </body>
    </html>
  `;
};

export const htmlPlugin: Plugin = {
  name: "htmlPlugin",
    setup(build) {
      const outdir = build.initialOptions.outdir;

      build.onEnd(async (result) => {
        const outputs = result.metafile?.outputs;
        const [jsPaths, cssPaths] = findPaths(Object.keys(outputs || {}));

        if (outdir) {
          await writeFile(resolve(outdir, "index.html"), renderHtml(jsPaths, cssPaths));
        }
      });
    },
};
