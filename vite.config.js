import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from "path";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/appnoticias/",
  build:{
    lib: {
      entry: path.resolve(__dirname, "src/index.js"),
      name: "app noticias",
      fileName: (format)=> `appnoticias.${format}.js`,
    },
    rollupOptions:{
      external:["react", "react-dom"],
      output:{
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        }
      }
    }
  },
});

