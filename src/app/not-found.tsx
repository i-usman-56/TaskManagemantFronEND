import Link from "next/link";
import DynamicErrorPage from "./error/[errorType]/page";

export default function NotFound() {
  return (
    <div>
      <DynamicErrorPage errorType="not-found" />
    </div>
  );
}
