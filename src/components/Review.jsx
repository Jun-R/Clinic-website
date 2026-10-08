import React from "react";
import ScrollReveal from "./ScrollReveal.jsx";

const REVIEWS = [
  {
    id: 27,
    author: "luc****",
    date: "2026.10.06",
    visit: "1번째 방문",
    content:
      "평일 낮에 방문해서 그런지 여유있게 진료 받았어요!\n상담해주시는 분도 너무 친절하고 원장님도 꼼꼼히 잘 진료해주셔서 좋았어요.\n동네에 이런곳이 있는지 알았으면 진작 여기올걸 ㅠㅠ\n그동안 강남으로 왔다갔다하느라 귀찮았는디..\n주차도 되고 정말 좋아요",
  },
  {
    id: 26,
    author: "rod****",
    date: "2026.10.05",
    visit: "3번째 방문",
    content:
      "재재방문입니다! 턱이랑 미간 보톡스 맞으러 왔어요\n공휴일에도 진료 가능하니까 편하고 좋아요bb",
  },
  {
    id: 25,
    author: "유림27",
    date: "2026.10.05",
    visit: "1번째 방문",
    content:
      "미간 주름이 고민되어 방문했는데, 상담실장님께서 전체적인 피부 상태까지 꼼꼼하게 체크해주시고 제 피부에 맞는 시술을 추천해주셔서 많은 도움이 됐어요.\n가격도 합리적이고 상담부터 전반적인 과정까지 만족스러워서 기분 좋게 다녀왔습니다. 😊",
  },
  {
    id: 24,
    author: "zim****",
    date: "2026.10.05",
    visit: "3번째 방문",
    content:
      "진료가 깔끔하고 보톡스 만족해요. 선생님이 의견주셔서 부위 조절하고 하니까 자연스러워요",
  },
  {
    id: 23,
    author: "kim****",
    date: "2026.10.04",
    visit: "5번째 방문",
    content:
      "항상 잘 이용하는 피부과입니다\n가격도 합리적이고 필요한 시술만 딱 추천해주시고 그게 딱좋아요~~\n조만간 또 방문 예정입니다:)",
  },
  {
    id: 22,
    author: "jyy****",
    date: "2026.10.03",
    visit: "8번째 방문",
    content:
      "방문 한지 벌써 몇 년째인지 모르겠어요. 저렴하고 합리적인 가격에 꼼꼼한 선생님이 보톡스 놔 주셔서 너무 좋아요.",
  },
  {
    id: 21,
    author: "kan****",
    date: "2026.10.03",
    visit: "4번째 방문",
    content:
      "여러 차례 보톡스 맞고 있어요! 부위별 자극없이 놔주셔서 늘 이용하고 있습니다.",
  },
  {
    id: 20,
    author: "파프리카2",
    date: "2026.10.02",
    visit: "3번째 방문",
    content:
      "보톡스랑 스킨바이브 시술했어요. 건조함, 모공, 팔자 고민 있었는데 시술 받자마자 개선된 게 보여요! 대박입니당ㅋㅋㅋㅋㅋ 그리고 진짜 안아파요!ㅠㅠ 보톡스보다도 안아픈듯요.\n주사 시술 엄청 무서워하는데 안심시켜주시고, 시술 설명도 상세히 해주셔서 감사했어용. 앞으로 효과가 보인다고 하니 엄청 기대됩니당👍",
  },
  {
    id: 19,
    author: "소금빵두",
    date: "2026.09.30",
    visit: "7번째 방문",
    content:
      "친절하게 응대해주시고\n진료도 잘 봐주셔서\n잘 아용하고 있습니다!",
  },
  {
    id: 18,
    author: "sou****",
    date: "2026.09.27",
    visit: "7번째 방문",
    content:
      "원래 자주 다니던 피부과인데, 이번에는 볼 모공 때문에 리쥬란 맞으러 갔다가 원장님 추천으로 스킨바이브 받았어요!\n\n생각보다 만족도가 정말 높았어요\n피부가 촉촉하고 매끈해지면서 피부결도 좋아지고, 볼 모공도 전보다 덜 도드라져 보여요\n무엇보다 원장님 손주사 기술이 정말 좋으셔서 꼼꼼하고 편하게 받을 수 있었어요😊\n\n제 피부 상태에 맞춰 시술 추천해주신 것도 좋았고, 역시 믿고 다니는 병원이라 이번에도 만족했어요 :)",
  },
  {
    id: 17,
    author: "sarah0419",
    date: "2026.08.26",
    visit: "2번째 방문",
    content:
      "원장님 너무 친절하시고 보톡스 꼭 직접 보여주신 후 시술해주십니다! 그래서 항상 여기로 와요 ㅎㅎ",
  },
  {
    id: 16,
    author: "djwldud",
    date: "2026.08.26",
    visit: "2번째 방문",
    content:
      "우리동네에 드디어 정착할 수 있는 병원이 있어서 너무 좋아요ㅎ 너무 친절하시고 의사선생님 손기술이 좋으셔서 오늘도 만족하고 갑니다:)",
  },
  {
    id: 15,
    author: "nam****",
    date: "2026.08.25",
    visit: "4번째 방문",
    content: "좋아요",
  },
  {
    id: 14,
    author: "ehd****",
    date: "2026.08.24",
    visit: "4번째 방문",
    content:
      "보톡스 맞으러 오는데 항상 친절하시고 안 아프시게 놔주셔서 너무 좋아요~~ 강추입니다!",
  },
  {
    id: 13,
    author: "ks****",
    date: "2026.08.24",
    visit: "3번째 방문",
    content:
      "재방문이에요 !!\n다른 곳에서 효과를 잘 못보던 저에게 신세계를 찾아준 보석같은 곳입니다,, 보톡스 맞으실 분들은 모두 여기로 오세요. 꼼꼼하시고 효과 너무 좋아요 💖",
  },
  {
    id: 12,
    author: "bos****",
    date: "2026.08.24",
    visit: "9번째 방문",
    content: "항상 친절하고 꼼꼼한 진료 감사합니다.",
  },
  {
    id: 11,
    author: "요도가와",
    date: "2026.08.22",
    visit: "4번째 방문",
    content: "보톡스 리쥬란HB 시술했어요 , 친절하시고 별로 안아파요^^",
  },
  {
    id: 10,
    author: "Jimin Sohn",
    date: "2026.08.22",
    visit: "5번째 방문",
    content: "친절하게 상담해주시고 저렴한 가격에 할 수있어요",
  },
  {
    id: 9,
    author: "Bella72",
    date: "2026.08.17",
    content: "예약하고 가서 대기 없이 진행했어요 친절하시고 꼼꼼하게 봐주십니다~ 재방문의향있음",
  },
  {
    id: 8,
    author: "갱갱이이8",
    date: "2026.08.17",
    content:
      "집 앞이라 항상 궁금했는데 후기가 좋아서 왔습니다.\n집 1분 거리고, 가격도 저렴하고\n의사선생님도 매우 유쾌하셔서 좋습니다!!!\n다음에 또 오겠습니당 🙂",
  },
  {
    id: 7,
    author: "깊은마당",
    date: "2026.08.16",
    content:
      "원장님을 비롯해서 모든 분들이 친절하세요.\n위치만 가깝다면 매번 와서 시술받고 싶어요\n원징님 손주사 정말 꼼꼼하게 놔주세요\n예약 할까말까 망설이시는 분들 하루 빨리 하시는게 본인들한테 이로우세요.\n원장님. 실장님을 비롯해서 모든 직원분들 모두 건강하세요",
  },
  {
    id: 6,
    author: "wmf****",
    date: "2026.08.16",
    content:
      "2년째 너무 잘 다니고 있습니다.\n주말에도 열어서 너무 좋습니다!",
  },
  {
    id: 5,
    author: "이아아아",
    date: "2026.08.15",
    content:
      "두번째 방문입니다. 처음 눈가 보톡스 맞았을때 효과가 좋았어서 재방문했어요 !! 저렴하고 실력 좋으신 선생님 때문에 저는 재방문예정입니다!",
  },
  {
    id: 4,
    author: "에이미0226",
    date: "2026.08.15",
    content:
      "집근처 피부과라서 리프팅이나 포텐자 하러 작년부터 꾸준히 다니고 있어요~\n가까운 곳에 좋은 피부과가 있어서 좋아요👍\n오늘은 리니어펌이랑 아이리쥬란 턱 보톡스하고갑니다☺️",
  },
  {
    id: 3,
    author: "kga****",
    date: "2026.08.15",
    content: "친절하신 원장님과 직원분들 덕분에 마음 편하게 받고왔습니다^^",
  },
  {
    id: 2,
    author: "sy9659",
    date: "2026.08.14",
    content:
      "친절한 원장님과 선생님들🥰\n재방문할수밖에없아요 ㅜㅠ 과도한 시술 권유 전혀 없어요",
  },
  {
    id: 1,
    author: "일랑일라",
    date: "2026.08.12",
    content:
      "두 번째 방문이에요~\n\n유지기간도 길고\n알아서 척척척 잘 놔주셔서 믿고 다녀요!\n\n상담도 너무 친절하셔요👍🏻",
  },
];

function ReviewRow({ reviews, rowKey }) {
  const loop = [...reviews, ...reviews, ...reviews];

  return (
    <div className="relative overflow-hidden rounded-xl">
      <div className="scrolling-banner gap-4 pr-4 flex">
        {loop.map((review, index) => (
          <article
            key={`${rowKey}-${review.id}-${index}`}
            className="
              w-[280px] sm:w-[320px]
              flex-shrink-0
              flex flex-col gap-3
              p-4
              border border-gray-100 rounded-2xl bg-gray-50/50
              dark:border-white/10 dark:bg-white/5
            "
          >
            <div className="flex flex-col flex-1">
              <div className="flex justify-between items-end mb-2">
                <div className="flex flex-col">
                  <span className="font-semibold">{review.author}</span>
                  {review.visit && (
                    <span className="text-xs opacity-50">{review.visit}</span>
                  )}
                </div>
                <span className="text-xs opacity-60">{review.date}</span>
              </div>

              <p className="text-sm leading-relaxed opacity-80 line-clamp-4 whitespace-pre-wrap">
                "{review.content}"
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function Review() {
  const mid = Math.ceil(REVIEWS.length / 2);
  const row1 = REVIEWS.slice(0, mid);
  const row2 = REVIEWS.slice(mid);

  return (
    <section id="reviews" className="scroll-mt-20">
      <ScrollReveal dir="up">
        <div className="card p-4 sm:p-6">
          <h2 className="text-xl font-semibold mb-3">미톡스 후기</h2>

          <div className="flex flex-col gap-4">
            <ReviewRow reviews={row1} rowKey="top" />
            <ReviewRow reviews={row2} rowKey="bottom" />
          </div>

          <div className="mt-6 text-center border-t border-gray-100 dark:border-white/10 pt-6">
            <a
              href="https://map.naver.com/p/entry/place/1225820706?c=15.00,0,0,0,dh&placePath=/review?additionalHeight=76&fromPanelNum=1&locale=ko&svcName=map_pcv5&timestamp=202601311550&additionalHeight=76&timestamp=202601311550&locale=ko&svcName=map_pcv5&fromPanelNum=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm text-green-600 font-medium hover:underline bg-green-50 px-4 py-2 rounded-full border border-green-100 transition-colors hover:bg-green-100"
            >
              네이버 지도에서 더 많은 후기 보기 →
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
