import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import ArticleCard from 'components/molecules/ArticleCard';

export default {
  title: 'Components/Molecules/ArticleCard',
  component: ArticleCard,
  excludeStories: ['args'],
} as ComponentMeta<typeof ArticleCard>;

const Template: ComponentStory<typeof ArticleCard> = (args) => (
  <ArticleCard {...args} />
);

export const args = {
  default: {
    title: 'ダミータイトル',
    date: new Date('2021-10-10T09:59:12.668Z'),
    name: '大石陸',
    content:
      '吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの見始であろう。この時妙なものだと思った感じが今でも残っている。第一毛をもって装飾されべきはずの顔がつるつるしてまるで薬缶だ。その後猫にもだいぶ逢ったがこんな片輪には一度も出会わした事がない。のみならず顔の真中があまりに突起している。そうしてその穴の中から時々ぷうぷうと煙を',
    href: '/hoge/fuga/piyo',
  },
  withNewLine: {
    title: 'ダミータイトル 改行あり',
    date: new Date('2021-10-10T09:59:12.668Z'),
    name: '鈴木拓哉',
    content: `吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。

    この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの見始であろう。
    この時妙なものだと思った感じが今でも残っている。第一毛をもって装飾されべきはずの顔がつるつるしてまるで薬缶だ。その後猫にもだいぶ逢ったがこんな片輪には一度も出会わした事がない。のみならず顔の真中があまりに突起している。
    そうしてその穴の中から時々ぷうぷ`,
    href: '/hoge/fuga/piyo',
  },
};

export const Default = Template.bind({ args: {} });
export const WithNewLine = Template.bind({ args: {} });
Default.args = args.default;
WithNewLine.args = args.withNewLine;
