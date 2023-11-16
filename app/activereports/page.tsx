

import type { NextPage } from "next";
import React from "react";
import { ViewerWrapperProps } from "@/app/activereports/_components/ReportViewer";

import dynamic from "next/dynamic";
const Viewer = dynamic<ViewerWrapperProps>(
  async () => {
    return (await import("@/app/activereports/_components/ReportViewer")).default;
  },
  { ssr: false }
);

const ActiveReportsPage: NextPage = () => {
  return (
    <div
      style={{ width: "100%", height: "100vh" }}
    >
      <Viewer
        reportUri="reports/my-report001.rdlx-json"
        language="ja"
      />
    </div>
  );
};


export default ActiveReportsPage;