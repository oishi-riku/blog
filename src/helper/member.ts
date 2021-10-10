const MEMBER = (process.env.NEXT_PUBLIC_MEMBER || '').split(',');

export const convertMember = (name: string): string | null => {
  switch (name) {
    case MEMBER[0]:
      return 'takumi_ishiduka';
    case MEMBER[1]:
      return 'michihito_ichihara';
    case MEMBER[2]:
      return 'riku_oishi';
    case MEMBER[3]:
      return 'takumi_saito';
    case MEMBER[4]:
      return 'toshiya_sawaki';
    case MEMBER[5]:
      return 'takuya_suzuki';
    case MEMBER[6]:
      return 'kazuki_yamanaka';
    case MEMBER[7]:
      return 'syuhei_yoshida';
    case MEMBER[8]:
      return 'taiga_yoneyama';
    default:
      return null;
  }
};
