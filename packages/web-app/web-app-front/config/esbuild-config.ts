import { build } from "esbuild";
import { resolve } from "path";

function resolveRoot(...segments: string[]): string {
  return resolve(__dirname, "..", ...segments);
}

build({
  outdir: resolveRoot("public"),
  entryPoints: [resolveRoot("src", "index.tsx")],
  minify: false,
  bundle: true,
  sourcemap: true,
  tsconfig: resolveRoot("tsconfig.json"),
  entryNames: "bundle",
  loader: {
    ".png": "file",
    ".svg": "file",
    ".jpg": "file",
  },
  // watch: {
  //   onRebuild(err) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log("builded");
  //     }
  //   },
  // },
}).then(() => {
  console.log("build done");
});
