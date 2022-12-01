import { ClientOnly } from 'remix-utils';
import type { LinksFunction } from '@remix-run/node';
import { Canvas } from "~/components";
import carbonStyles from "@carbon/charts/styles.css";

import { canvasLinks } from '~/components/Canvas/Canvas.client';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: carbonStyles },
    ...canvasLinks()
  ]
}
export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <ClientOnly fallback={<p>Loading...</p>}>
        {() => <Canvas />}
      </ClientOnly>
    </div>
  );
}
