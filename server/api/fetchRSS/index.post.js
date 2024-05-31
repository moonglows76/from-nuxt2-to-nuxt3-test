// RSSをパースするオブジェクトのインポート
import Parser from "rss-parser";

export default defineEventHandler(async (event) => {
  // RSSのURLをAPIにPOSTされた内容から取得
  const body = await readBody(event);
  const url = body.url
  if (!url) {
    throw createError({
      statusCode: 200,
      statusMessage: 'URL is not given.',
    })
  }

  // RSSを読み取って配列で戻す
  const parser = new Parser();
  const feed = await parser.parseURL(url);
  const data = feed.items.map((item) => {
      return {
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
      }
    }
  );
  return {
    data,
  }
});
