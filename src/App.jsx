import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

import navConfig from "@/config/navConfig";

export default function App() {
  return (
    <MainLayout>
      <Routes>
        {navConfig.flatMap((group) =>
          group.items.map((item) => {
            const Page = item.element;
            return <Route key={item.url} path={item.url} element={<Page />} />;
          })
        )}
      </Routes>
    </MainLayout>
  );
}
