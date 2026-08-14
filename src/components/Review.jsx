import React from "react";
import ScrollReveal from "./ScrollReveal.jsx";

// Edit reviews here — text only.
const REVIEWS = [
  {
    id: 19,
    author: "일랑일라",
    date: "2026.08.12",
    content:
      "두 번째 방문이에요~\n\n유지기간도 길고\n알아서 척척척 잘 놔주셔서 믿고 다녀요!\n\n상담도 너무 친절하셔요👍🏻",
  },
  {
    id: 18,
    author: "rinning0",
    date: "2026.08.12",
    content: "친절하시고 꼼꼼히 봐주세요",
  },
  {
    id: 17,
    author: "호호호2392",
    date: "2026.08.12",
    content: "친절하세요~~ 과잉진료 없어요~^^",
  },
  {
    id: 16,
    author: "sung460",
    date: "2026.08.12",
    content: "상세한 상담 감사해요~^^ 다음에 또 방문할께요",
  },
  {
    id: 15,
    author: "쥬으니",
    date: "2026.08.12",
    content:
      "자주와요! 원장님도 친절하시고. 피부관리실 선생님도 친절해여!\n친구들도 왕창 소개했어요!! ㅋ",
  },
  {
    id: 14,
    author: "허둥1",
    date: "2026.08.12",
    content:
      "주기적으로 보톡스시술하러 오는 곳\n항상 합리적인 가격과 정확한 시술 감사합니다~~!!",
  },
  {
    id: 13,
    author: "루피3379",
    date: "2026.08.11",
    content:
      "이전에 보톡스 시술을 받으러 방문했었는데, 그때도 상담부터 시술까지 전체적으로 만족스러웠던 기억이 있어서 재방문했어요~🙂\n\n방문할 때마다 느끼는 부분이었지만, 원장님부터 실장님, 직원분들까지 모두 친절하시고 상담부터 시술, 마무리까지 만족도가 높았어요~😊\n\n무엇보다 과한 권유 없이 제 피부에 딱 필요한 부분을 중심으로 상담해주시는 게 정말 좋았어요~\n실장님께서 제 피부 상태와 고민을 꼼꼼하게 봐주시고 스킨바이브를 추천해주셔서 이번에 진행해봤는데,\n결과적으로 만족스러워요~~🤍\n\n그리고 원장님도 정말 꼼꼼하십니다~ 시술 전 피부 상태를 세심하게 확인해주시고 차분하게 설명해주셔서 믿고 받을 수 있었어요~^^\n\n다음에 관리 필요하거나 보톡스 주기에도\n또 미톡스외과의원으로 방문할게요🫶🏻",
  },
  {
    id: 12,
    author: "lhd****",
    date: "2026.08.11",
    content:
      "3번째방문하였읍니다 가격에놀라고 원장님실력에\n놀라울정도로만족합니다 추천해요 여러가지가성비\n는물론 효과도즉각입니다",
  },
  {
    id: 11,
    author: "052****",
    date: "2026.08.11",
    content: "정말 전국에서 리쥬란 제일잘해요 최고",
  },
  {
    id: 10,
    author: "맨날배고팜",
    date: "2026.08.09",
    content: "항상 원장님 한분이 꾸준히해주셔서 신뢰가 갑니당",
  },
  {
    id: 9,
    author: "tofrehppy",
    date: "2026.08.07",
    content:
      "친구가 추천해줘서 갔는데, 듣던 대로 선생님 정말 친절하고 세심하게 시술해주셨고, 실장님도 궁금한 부분 자세히 설명해주셨어요. 후관리 해주신 간호사 선생님도 너무 친절하셨고, 시술 잘 받고 대만족입니다. 자주 가게 될것 같습니다^^",
  },
  {
    id: 8,
    author: "카푸치노5",
    date: "2026.08.07",
    content: "소개받고 온 상태라 어떤지는 알고 왔지만, 상담 친절히 해주셔서 잘 받았어요~~",
  },
  {
    id: 7,
    author: "sin****",
    date: "2026.07.31",
    content:
      "이마.미간.콧등.사각턱 보톡스 맞았어요\n간호사님이 친절히 상담해주셨고 의사쌤이 정품확인시켜주시고 꼼꼼하게 주사 놓아주셨네요~\n항상 친절히 반겨주셔서 담에 또 올께요^^",
  },
  {
    id: 6,
    author: "마이펫티처",
    date: "2026.07.28",
    content:
      "첫방문이였습니다.\n친절하게 설명해주시고,\n시술 받을때도 세심하게 케어해주셔서 감사드려요~\n보톡스는 이벤트가로 저렴하게 시술 하였고,\n스킨바이브도 처음 해보았는데,\n자연스럽게 예뻐진다고 하셔서,\n매일매일 아무도 모르게 예뻐지기를 기대하고 있습니다 ^^\n\n앞으로도 잘 부탁드립니다!!",
  },
  {
    id: 5,
    author: "고르고르찌유",
    date: "2026.01.31",
    content:
      "여기 다닌지는 2년정도 된거같네요^^ 가격도 착하고 설명도 친절하고 시술을 과하게 권하지 않아서 좋은곳입니다 강추",
  },
  {
    id: 4,
    author: "hancat430",
    date: "2026.01.31",
    content: "원장님 친철하시고 보톡스 효과 오래가요",
  },
  {
    id: 3,
    author: "레이첼 혹은 데이지",
    date: "2026.01.31",
    content:
      "지난번 방문후 만족도가 높아 보톡스 다시 맞을 시긴에 맞춰 재방문. 원장선생님의 꼼꼼함과 친절. 간호사샘들도 꼼꼼히 봐주시고 친절하고, 병원 내부도 넘 깔끔하고 조용하고 한산하고 차분히 빠르게 진행되어 너무 좋아요. 편히 관리받으시고픈 분들에게 추천드립니다.",
  },
  {
    id: 2,
    author: "조조8285",
    date: "2026.01.30",
    content:
      "이번에 헤어라인 제모도 하고 1년만에 턱보톡스 받았고 집가는 버스 타서 리뷰 남겨요🐈‍⬛🎶 원래 이마 제모로 왔는데 일단 원장님이 정말 꼼꼼하고 세심하시고 친절하셔서 너무 좋았어요 기술이 엄청나십니다 제 얼굴형에 맞춰서 디자인을 정말 공들여 잡아주시는 게 느껴졌고 제가 디자이너라 정말 예민한데 예쁘게 만들어주세요 정말 효과를 잊지 못해요 이직면접 잡혀있는데 용감하게 맞아봅니다 반차나 연차 쓰고 올 가치가 충분한 곳입니다 제대로 된 시술받고 싶은 분들께 진심 추천드려요 제가 제주도에 살아도 와서 한번씩 받을 것 같아요ㅜㅜ 시술 내내 친절하게 설명해 주셔서 감사했어요🥹 제가 어마어마한 쫄보인데간호사님이랑 실장님도 너무 잘 대해주셔서 그런지 긴장도 덜 되고 다른 곳에 비해 통증도 거의 없더라고요 요술 롤러인가",
  },
  {
    id: 1,
    author: "이서진18",
    date: "2026.01.23",
    content:
      "두번째 방문이에요 이마 미간은 늘 맞는데 여기 원장님만 제 근육 크기랑 비대칭 알아보시고 양쪽 양 조절해서 달리 해주셨어요 미간에 근육이 옆으로?? 암튼 좀 특이 했능데 여기서 처음으로 크기가 줄었어요 그래서 다시 왔어요 앞으로 미간 이마는 여기로 다닐듯해요",
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
                <span className="font-semibold">{review.author}</span>
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
