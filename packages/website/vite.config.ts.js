// vite.config.ts
import vue from "@vitejs/plugin-vue";
import { join as join4 } from "desm";
import markdownItAnchor from "markdown-it-anchor";
import markdownItTaskCheckbox from "markdown-it-task-checkbox";
import { defineConfig } from "vite";
import jsImports from "rollup-plugin-js-imports";
import Markdown from "vite-plugin-md";
import WindiCSS from "vite-plugin-windicss";

// vite-plugins/articles-loader.ts
import { join } from "desm";
import matter from "gray-matter";
import * as fs from "node:fs";
import * as path from "node:path";
function articlesLoader() {
  const articleFilesDir = join("file:///Users/leonzalion/projects/blog/packages/website/vite-plugins/articles-loader.ts", "../src/assets/data/articles");
  const articleFiles = fs.readdirSync(articleFilesDir);
  const articleMatters = Object.fromEntries(articleFiles.map((articleFile) => {
    const articleSlug = path.basename(articleFile, ".md");
    return [
      articleSlug,
      {
        ...matter(fs.readFileSync(path.join(articleFilesDir, articleFile), "utf8")).data,
        slug: articleSlug
      }
    ];
  }));
  return {
    name: "articles-data",
    resolveId(id) {
      if (id === "~data/articles") {
        return id;
      }
    },
    load(id) {
      if (id === "~data/articles") {
        return `export default ${JSON.stringify(articleMatters)}`;
      }
    }
  };
}

// vite-plugins/daily-timeblocks-loader.ts
import { join as join3 } from "desm";
import * as fs2 from "node:fs";
function dailyTimeblocksLoader() {
  const dailyTimeblocksDir = join3("file:///Users/leonzalion/projects/blog/packages/website/vite-plugins/daily-timeblocks-loader.ts", "../../daily-timeblocks");
  const dateStrings = fs2.readdirSync(dailyTimeblocksDir, { withFileTypes: true }).filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);
  return {
    name: "daily-timeblocks-loader",
    resolveId(id) {
      if (id === "~data/daily-timeblocks") {
        return id;
      }
    },
    load(id) {
      if (id === "~data/daily-timeblocks") {
        return `export default ${JSON.stringify(dateStrings)}`;
      }
    }
  };
}

// vite.config.ts
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "~": join4("file:///Users/leonzalion/projects/blog/packages/website/vite.config.ts", "./src")
    }
  },
  plugins: [
    vue({ reactivityTransform: true, include: [/\.vue$/, /\.md$/] }),
    Markdown({
      markdownItOptions: {
        linkify: true
      },
      markdownItSetup(md) {
        md.use(markdownItTaskCheckbox);
        md.use(markdownItAnchor);
      }
    }),
    WindiCSS(),
    jsImports(),
    articlesLoader(),
    dailyTimeblocksLoader()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidml0ZS1wbHVnaW5zL2FydGljbGVzLWxvYWRlci50cyIsICJ2aXRlLXBsdWdpbnMvZGFpbHktdGltZWJsb2Nrcy1sb2FkZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCB7IGpvaW4gfSBmcm9tICdkZXNtJztcbmltcG9ydCBtYXJrZG93bkl0QW5jaG9yIGZyb20gJ21hcmtkb3duLWl0LWFuY2hvcic7XG5pbXBvcnQgbWFya2Rvd25JdFRhc2tDaGVja2JveCBmcm9tICdtYXJrZG93bi1pdC10YXNrLWNoZWNrYm94JztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IGpzSW1wb3J0cyBmcm9tICdyb2xsdXAtcGx1Z2luLWpzLWltcG9ydHMnO1xuaW1wb3J0IE1hcmtkb3duIGZyb20gJ3ZpdGUtcGx1Z2luLW1kJztcbmltcG9ydCBXaW5kaUNTUyBmcm9tICd2aXRlLXBsdWdpbi13aW5kaWNzcyc7XG5cbmltcG9ydCB7IGFydGljbGVzTG9hZGVyIH0gZnJvbSAnLi92aXRlLXBsdWdpbnMvYXJ0aWNsZXMtbG9hZGVyLmpzJztcbmltcG9ydCB7IGRhaWx5VGltZWJsb2Nrc0xvYWRlciB9IGZyb20gJy4vdml0ZS1wbHVnaW5zL2RhaWx5LXRpbWVibG9ja3MtbG9hZGVyLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcblx0cmVzb2x2ZToge1xuXHRcdGFsaWFzOiB7XG5cdFx0XHQnfic6IGpvaW4oXCJmaWxlOi8vL1VzZXJzL2xlb256YWxpb24vcHJvamVjdHMvYmxvZy9wYWNrYWdlcy93ZWJzaXRlL3ZpdGUuY29uZmlnLnRzXCIsICcuL3NyYycpLFxuXHRcdH0sXG5cdH0sXG5cdHBsdWdpbnM6IFtcblx0XHR2dWUoeyByZWFjdGl2aXR5VHJhbnNmb3JtOiB0cnVlLCBpbmNsdWRlOiBbL1xcLnZ1ZSQvLCAvXFwubWQkL10gfSksXG5cdFx0TWFya2Rvd24oe1xuXHRcdFx0bWFya2Rvd25JdE9wdGlvbnM6IHtcblx0XHRcdFx0bGlua2lmeTogdHJ1ZSxcblx0XHRcdH0sXG5cdFx0XHRtYXJrZG93bkl0U2V0dXAobWQpIHtcblx0XHRcdFx0bWQudXNlKG1hcmtkb3duSXRUYXNrQ2hlY2tib3gpO1xuXHRcdFx0XHRtZC51c2UobWFya2Rvd25JdEFuY2hvcik7XG5cdFx0XHR9LFxuXHRcdH0pLFxuXHRcdFdpbmRpQ1NTKCksXG5cdFx0anNJbXBvcnRzKCksXG5cdFx0YXJ0aWNsZXNMb2FkZXIoKSxcblx0XHRkYWlseVRpbWVibG9ja3NMb2FkZXIoKSxcblx0XSxcbn0pO1xuIiwgImltcG9ydCB7IGpvaW4gfSBmcm9tICdkZXNtJztcbmltcG9ydCBtYXR0ZXIgZnJvbSAnZ3JheS1tYXR0ZXInO1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnbm9kZTpmcyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ25vZGU6cGF0aCc7XG5pbXBvcnQgdHlwZSB7IFBsdWdpbiB9IGZyb20gJ3ZpdGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gYXJ0aWNsZXNMb2FkZXIoKTogUGx1Z2luIHtcblx0Y29uc3QgYXJ0aWNsZUZpbGVzRGlyID0gam9pbihcImZpbGU6Ly8vVXNlcnMvbGVvbnphbGlvbi9wcm9qZWN0cy9ibG9nL3BhY2thZ2VzL3dlYnNpdGUvdml0ZS1wbHVnaW5zL2FydGljbGVzLWxvYWRlci50c1wiLCAnLi4vc3JjL2Fzc2V0cy9kYXRhL2FydGljbGVzJyk7XG5cdGNvbnN0IGFydGljbGVGaWxlcyA9IGZzLnJlYWRkaXJTeW5jKGFydGljbGVGaWxlc0Rpcik7XG5cblx0Y29uc3QgYXJ0aWNsZU1hdHRlcnMgPSBPYmplY3QuZnJvbUVudHJpZXMoXG5cdFx0YXJ0aWNsZUZpbGVzLm1hcCgoYXJ0aWNsZUZpbGUpID0+IHtcblx0XHRcdGNvbnN0IGFydGljbGVTbHVnID0gcGF0aC5iYXNlbmFtZShhcnRpY2xlRmlsZSwgJy5tZCcpO1xuXG5cdFx0XHRyZXR1cm4gW1xuXHRcdFx0XHRhcnRpY2xlU2x1Zyxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdC4uLm1hdHRlcihcblx0XHRcdFx0XHRcdGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oYXJ0aWNsZUZpbGVzRGlyLCBhcnRpY2xlRmlsZSksICd1dGY4Jylcblx0XHRcdFx0XHQpLmRhdGEsXG5cdFx0XHRcdFx0c2x1ZzogYXJ0aWNsZVNsdWcsXG5cdFx0XHRcdH0sXG5cdFx0XHRdO1xuXHRcdH0pXG5cdCk7XG5cblx0cmV0dXJuIHtcblx0XHRuYW1lOiAnYXJ0aWNsZXMtZGF0YScsXG5cdFx0cmVzb2x2ZUlkKGlkKSB7XG5cdFx0XHRpZiAoaWQgPT09ICd+ZGF0YS9hcnRpY2xlcycpIHtcblx0XHRcdFx0cmV0dXJuIGlkO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0bG9hZChpZCkge1xuXHRcdFx0aWYgKGlkID09PSAnfmRhdGEvYXJ0aWNsZXMnKSB7XG5cdFx0XHRcdHJldHVybiBgZXhwb3J0IGRlZmF1bHQgJHtKU09OLnN0cmluZ2lmeShhcnRpY2xlTWF0dGVycyl9YDtcblx0XHRcdH1cblx0XHR9LFxuXHR9O1xufVxuIiwgImltcG9ydCB7IGpvaW4gfSBmcm9tICdkZXNtJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ25vZGU6ZnMnO1xuaW1wb3J0IHR5cGUgeyBQbHVnaW4gfSBmcm9tICd2aXRlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGRhaWx5VGltZWJsb2Nrc0xvYWRlcigpOiBQbHVnaW4ge1xuXHRjb25zdCBkYWlseVRpbWVibG9ja3NEaXIgPSBqb2luKFwiZmlsZTovLy9Vc2Vycy9sZW9uemFsaW9uL3Byb2plY3RzL2Jsb2cvcGFja2FnZXMvd2Vic2l0ZS92aXRlLXBsdWdpbnMvZGFpbHktdGltZWJsb2Nrcy1sb2FkZXIudHNcIiwgJy4uLy4uL2RhaWx5LXRpbWVibG9ja3MnKTtcblx0Y29uc3QgZGF0ZVN0cmluZ3MgPSBmc1xuXHRcdC5yZWFkZGlyU3luYyhkYWlseVRpbWVibG9ja3NEaXIsIHsgd2l0aEZpbGVUeXBlczogdHJ1ZSB9KVxuXHRcdC5maWx0ZXIoKGRpcmVudCkgPT4gZGlyZW50LmlzRGlyZWN0b3J5KCkpXG5cdFx0Lm1hcCgoZGlyZW50KSA9PiBkaXJlbnQubmFtZSk7XG5cblx0cmV0dXJuIHtcblx0XHRuYW1lOiAnZGFpbHktdGltZWJsb2Nrcy1sb2FkZXInLFxuXHRcdHJlc29sdmVJZChpZCkge1xuXHRcdFx0aWYgKGlkID09PSAnfmRhdGEvZGFpbHktdGltZWJsb2NrcycpIHtcblx0XHRcdFx0cmV0dXJuIGlkO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0bG9hZChpZCkge1xuXHRcdFx0aWYgKGlkID09PSAnfmRhdGEvZGFpbHktdGltZWJsb2NrcycpIHtcblx0XHRcdFx0cmV0dXJuIGBleHBvcnQgZGVmYXVsdCAke0pTT04uc3RyaW5naWZ5KGRhdGVTdHJpbmdzKX1gO1xuXHRcdFx0fVxuXHRcdH0sXG5cdH07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFHTywwQkFBa0M7QUFDeEMsUUFBTSxrQkFBa0IsS0FBSywyRkFBMkYsNkJBQTZCO0FBQ3JKLFFBQU0sZUFBZSxBQUFHLGVBQVksZUFBZTtBQUVuRCxRQUFNLGlCQUFpQixPQUFPLFlBQzdCLGFBQWEsSUFBSSxDQUFDLGdCQUFnQjtBQUNqQyxVQUFNLGNBQWMsQUFBSyxjQUFTLGFBQWEsS0FBSztBQUVwRCxXQUFPO0FBQUEsTUFDTjtBQUFBLE1BQ0E7QUFBQSxXQUNJLE9BQ0YsQUFBRyxnQkFBYSxBQUFLLFVBQUssaUJBQWlCLFdBQVcsR0FBRyxNQUFNLENBQ2hFLEVBQUU7QUFBQSxRQUNGLE1BQU07QUFBQSxNQUNQO0FBQUEsSUFDRDtBQUFBLEVBQ0QsQ0FBQyxDQUNGO0FBRUEsU0FBTztBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sVUFBVSxJQUFJO0FBQ2IsVUFBSSxPQUFPLGtCQUFrQjtBQUM1QixlQUFPO0FBQUEsTUFDUjtBQUFBLElBQ0Q7QUFBQSxJQUNBLEtBQUssSUFBSTtBQUNSLFVBQUksT0FBTyxrQkFBa0I7QUFDNUIsZUFBTyxrQkFBa0IsS0FBSyxVQUFVLGNBQWM7QUFBQSxNQUN2RDtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQ0Q7OztBQ3ZDQTtBQUNBO0FBR08saUNBQXlDO0FBQy9DLFFBQU0scUJBQXFCLE1BQUssbUdBQW1HLHdCQUF3QjtBQUMzSixRQUFNLGNBQWMsQUFDbEIsZ0JBQVksb0JBQW9CLEVBQUUsZUFBZSxLQUFLLENBQUMsRUFDdkQsT0FBTyxDQUFDLFdBQVcsT0FBTyxZQUFZLENBQUMsRUFDdkMsSUFBSSxDQUFDLFdBQVcsT0FBTyxJQUFJO0FBRTdCLFNBQU87QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFVBQVUsSUFBSTtBQUNiLFVBQUksT0FBTywwQkFBMEI7QUFDcEMsZUFBTztBQUFBLE1BQ1I7QUFBQSxJQUNEO0FBQUEsSUFDQSxLQUFLLElBQUk7QUFDUixVQUFJLE9BQU8sMEJBQTBCO0FBQ3BDLGVBQU8sa0JBQWtCLEtBQUssVUFBVSxXQUFXO0FBQUEsTUFDcEQ7QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUNEOzs7QUZaQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMzQixTQUFTO0FBQUEsSUFDUixPQUFPO0FBQUEsTUFDTixLQUFLLE1BQUssMEVBQTBFLE9BQU87QUFBQSxJQUM1RjtBQUFBLEVBQ0Q7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNSLElBQUksRUFBRSxxQkFBcUIsTUFBTSxTQUFTLENBQUMsVUFBVSxPQUFPLEVBQUUsQ0FBQztBQUFBLElBQy9ELFNBQVM7QUFBQSxNQUNSLG1CQUFtQjtBQUFBLFFBQ2xCLFNBQVM7QUFBQSxNQUNWO0FBQUEsTUFDQSxnQkFBZ0IsSUFBSTtBQUNuQixXQUFHLElBQUksc0JBQXNCO0FBQzdCLFdBQUcsSUFBSSxnQkFBZ0I7QUFBQSxNQUN4QjtBQUFBLElBQ0QsQ0FBQztBQUFBLElBQ0QsU0FBUztBQUFBLElBQ1QsVUFBVTtBQUFBLElBQ1YsZUFBZTtBQUFBLElBQ2Ysc0JBQXNCO0FBQUEsRUFDdkI7QUFDRCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
