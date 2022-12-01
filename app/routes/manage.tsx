import { ClientOnly } from 'remix-utils';
import type { LinksFunction } from '@remix-run/node';
import { Canvas } from "~/components";
import carbonStyles from "@carbon/charts/styles.css";
import canvasStyles from '~/components/Canvas/canvas.styles.css';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: carbonStyles },
    { rel: 'stylesheet', href: canvasStyles }
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
