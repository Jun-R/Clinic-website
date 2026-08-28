import React from "react";
import ScrollReveal from "./ScrollReveal.jsx";

const REVIEWS = [
  {
    id: 27,
    author: "sarah0419",
    date: "2026.08.26",
    visit: "2번째 방문",
    content:
      "원장님 너무 친절하시고 보톡스 꼭 직접 보여주신 후 시술해주십니다! 그래서 항상 여기로 와요 ㅎㅎ",
  },
  {
    id: 26,
    author: "djwldud",
    date: "2026.08.26",
    visit: "2번째 방문",
    content:
      "우리동네에 드디어 정착할 수 있는 병원이 있어서 너무 좋아요ㅎ 너무 친절하시고 의사선생님 손기술이 좋으셔서 오늘도 만족하고 갑니다:)",
  },
  {
    id: 25,
    author: "nam****",
    date: "2026.08.25",
    visit: "4번째 방문",
    content: "좋아요",
  },
  {
    id: 24,
    author: "ehd****",
    date: "2026.08.24",
    visit: "4번째 방문",
    content:
      "보톡스 맞으러 오는데 항상 친절하시고 안 아프시게 놔주셔서 너무 좋아요~~ 강추입니다!",
  },
  {
    id: 23,
    author: "ks****",
    date: "2026.08.24",
    visit: "3번째 방문",
    content:
      "재방문이에요 !!\n다른 곳에서 효과를 잘 못보던 저에게 신세계를 찾아준 보석같은 곳입니다,, 보톡스 맞으실 분들은 모두 여기로 오세요. 꼼꼼하시고 효과 너무 좋아요 💖",
  },
  {
    id: 22,
    author: "bos****",
    date: "2026.08.24",
    visit: "9번째 방문",
    content: "항상 친절하고 꼼꼼한 진료 감사합니다.",
  },
  {
    id: 21,
    author: "요도가와",
    date: "2026.08.22",
    visit: "4번째 방문",
    content: "보톡스 리쥬란HB 시술했어요 , 친절하시고 별로 안아파요^^",
  },
  {
    id: 20,
    author: "Jimin Sohn",
    date: "2026.08.22",
    visit: "5번째 방문",
    content: "친절하게 상담해주시고 저렴한 가격에 할 수있어요",
  },
  {
    id: 19,
    author: "소금빵두",
    date: "2026.08.19",
    content:
      "항상 친절하시고\n시술도 잘해주세요\n추천합니다!",
  },
  {
    id: 18,
    author: "Bella72",
    date: "2026.08.17",
    content: "예약하고 가서 대기 없이 진행했어요 친절하시고 꼼꼼하게 봐주십니다~ 재방문의향있음",
  },
  {
    id: 17,
    author: "갱갱이이8",
    date: "2026.08.17",
    content:
      "집 앞이라 항상 궁금했는데 후기가 좋아서 왔습니다.\n집 1분 거리고, 가격도 저렴하고\n의사선생님도 매우 유쾌하셔서 좋습니다!!!\n다음에 또 오겠습니당 🙂",
  },
  {
    id: 16,
    author: "깊은마당",
    date: "2026.08.16",
    content:
      "원장님을 비롯해서 모든 분들이 친절하세요.\n위치만 가깝다면 매번 와서 시술받고 싶어요\n원징님 손주사 정말 꼼꼼하게 놔주세요\n예약 할까말까 망설이시는 분들 하루 빨리 하시는게 본인들한테 이로우세요.\n원장님. 실장님을 비롯해서 모든 직원분들 모두 건강하세요",
  },
  {
    id: 15,
    author: "wmf****",
    date: "2026.08.16",
    content:
      "2년째 너무 잘 다니고 있습니다.\n주말에도 열어서 너무 좋습니다!",
  },
  {
    id: 14,
    author: "이아아아",
    date: "2026.08.15",
    content:
      "두번째 방문입니다. 처음 눈가 보톡스 맞았을때 효과가 좋았어서 재방문했어요 !! 저렴하고 실력 좋으신 선생님 때문에 저는 재방문예정입니다!",
  },
  {
    id: 13,
    author: "에이미0226",
    date: "2026.08.15",
    content:
      "집근처 피부과라서 리프팅이나 포텐자 하러 작년부터 꾸준히 다니고 있어요~\n가까운 곳에 좋은 피부과가 있어서 좋아요👍\n오늘은 리니어펌이랑 아이리쥬란 턱 보톡스하고갑니다☺️",
  },
  {
    id: 12,
    author: "kga****",
    date: "2026.08.15",
    content: "친절하신 원장님과 직원분들 덕분에 마음 편하게 받고왔습니다^^",
  },
  {
    id: 11,
    author: "sy9659",
    date: "2026.08.14",
    content:
      "친절한 원장님과 선생님들🥰\n재방문할수밖에없아요 ㅜㅠ 과도한 시술 권유 전혀 없어요",
  },
  {
    id: 10,
    author: "일랑일라",
    date: "2026.08.12",
    content:
      "두 번째 방문이에요~\n\n유지기간도 길고\n알아서 척척척 잘 놔주셔서 믿고 다녀요!\n\n상담도 너무 친절하셔요👍🏻",
  },
  {
    id: 9,
    author: "rinning0",
    date: "2026.08.12",
    content: "친절하시고 꼼꼼히 봐주세요",
  },
  {
    id: 8,
    author: "호호호2392",
    date: "2026.08.12",
    content: "친절하세요~~ 과잉진료 없어요~^^",
  },
  {
    id: 7,
    author: "sung460",
    date: "2026.08.12",
    content: "상세한 상담 감사해요~^^ 다음에 또 방문할께요",
  },
  {
    id: 6,
    author: "쥬으니",
    date: "2026.08.12",
    content:
      "자주와요! 원장님도 친절하시고. 피부관리실 선생님도 친절해여!\n친구들도 왕창 소개했어요!! ㅋ",
  },
  {
    id: 5,
    author: "허둥1",
    date: "2026.08.12",
    content:
      "주기적으로 보톡스시술하러 오는 곳\n항상 합리적인 가격과 정확한 시술 감사합니다~~!!",
  },
  {
    id: 4,
    author: "루피3379",
    date: "2026.08.11",
    content:
      "이전에 보톡스 시술을 받으러 방문했었는데, 그때도 상담부터 시술까지 전체적으로 만족스러웠던 기억이 있어서 재방문했어요~🙂\n\n방문할 때마다 느끼는 부분이었지만, 원장님부터 실장님, 직원분들까지 모두 친절하시고 상담부터 시술, 마무리까지 만족도가 높았어요~😊\n\n무엇보다 과한 권유 없이 제 피부에 딱 필요한 부분을 중심으로 상담해주시는 게 정말 좋았어요~\n실장님께서 제 피부 상태와 고민을 꼼꼼하게 봐주시고 스킨바이브를 추천해주셔서 이번에 진행해봤는데,\n결과적으로 만족스러워요~~🤍\n\n그리고 원장님도 정말 꼼꼼하십니다~ 시술 전 피부 상태를 세심하게 확인해주시고 차분하게 설명해주셔서 믿고 받을 수 있었어요~^^\n\n다음에 관리 필요하거나 보톡스 주기에도\n또 미톡스외과의원으로 방문할게요🫶🏻",
  },
  {
    id: 3,
    author: "lhd****",
    date: "2026.08.11",
    content:
      "3번째방문하였읍니다 가격에놀라고 원장님실력에\n놀라울정도로만족합니다 추천해요 여러가지가성비\n는물론 효과도즉각입니다",
  },
  {
    id: 2,
    author: "052****",
    date: "2026.08.11",
    content: "정말 전국에서 리쥬란 제일잘해요 최고",
  },
  {
    id: 1,
    author: "맨날배고팜",
    date: "2026.08.09",
    content: "항상 원장님 한분이 꾸준히해주셔서 신뢰가 갑니당",
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
