import BookmarkList, { type BookmarkItem } from "./ListComponent/BookmarkList";

import mytoolList from "./bookMarkJSON/mytool.json";
import codingTechList from "./bookMarkJSON/codingTech.json";
import designRefList from "./bookMarkJSON/designRef.json";
import interestList from "./bookMarkJSON/interest.json";
import mcpList from "./bookMarkJSON/mcp.json";

const myTools: BookmarkItem[] = mytoolList;
const designRefs: BookmarkItem[] = designRefList;
const codingTechs: BookmarkItem[] = codingTechList;
const interests: BookmarkItem[] = interestList;
const MCPs: BookmarkItem[] = mcpList;

function App() {
  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">便利サイト一覧</p>
        <h1>bookMarkSite</h1>
        <p className="lead">以下ブックマーク一覧</p>
        <h2>便利ツール</h2>
        <BookmarkList items={myTools} />
        <h2>コーディングテク</h2>
        <BookmarkList items={codingTechs} />
        <h2>デザイン参考</h2>
        <BookmarkList items={designRefs} />
        <h2>興味</h2>
        <BookmarkList items={interests} />
        <h2>MCPサーバ</h2>
        <BookmarkList items={MCPs} />
      </section>
    </main>
  );
}

export default App;
