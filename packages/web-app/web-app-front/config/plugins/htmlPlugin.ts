import { Plugin } from "esbuild";
import { writeFile } from "fs/promises";
import { resolve } from "path";

/*In the future, you can significantly expand
  the fields and possibilities for the plugin.*/
type HtmlPluginOptionsType = {
  title: string;
  jsPaths?: string[];
  cssPaths?: string[];
};

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

const prepareRenderOptions = (
  scriptPaths: string[],
  stylePaths: string[],
  opt: HtmlPluginOptionsType
): HtmlPluginOptionsType => {
  const isThereCss = Object.keys(opt).includes("cssPaths");
  const isThereJs = Object.keys(opt).includes("jsPaths");
  const resultOpt = Object.assign(opt);

  if (isThereJs) {
    resultOpt.jsPaths = resultOpt.jsPaths.concat(scriptPaths);
  } else {
    resultOpt.jsPaths = scriptPaths;
  }

  if (isThereCss) {
    resultOpt.cssPaths = resultOpt.cssPaths.concat(stylePaths);
  } else {
    resultOpt.cssPaths = stylePaths;
  }

  return resultOpt;
};

const renderHtml = (options: HtmlPluginOptionsType): string => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${options.title}</title>
    ${options.cssPaths?.map((path) => `<link rel="stylesheet" href="/${path}" />`).join("\n\t\t\t")}
  </head>
  <body>
    <div id="root"></div>
    ${options.jsPaths?.map((path) => `<script src=/${path}></script>`).join("\n\t\t\t")}
  </body>
</html>`;
};

export const htmlPlugin = (options: HtmlPluginOptionsType): Plugin => {
  return {
    name: "htmlPlugin",
    setup(build) {
      const outdir = build.initialOptions.outdir;

      build.onEnd(async (result) => {
        const outputs = result.metafile?.outputs;
        const [jsPaths, cssPaths] = findPaths(Object.keys(outputs || {}));

        if (outdir) {
          const renderOptions = prepareRenderOptions(jsPaths, cssPaths, options);
          await writeFile(resolve(outdir, "index.html"), renderHtml(renderOptions));
        }
      });
    },
  };
};
