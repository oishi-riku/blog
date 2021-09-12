const MEMBER = (process.env.NEXT_PUBLIC_MEMBER || '').split(',');

const convertMember = (name: string) => {
  switch (name) {
    case MEMBER[0]:
      return 'riku_oishi';
    case MEMBER[1]:
      return 'takuya_suzuki';
    case MEMBER[2]:
      return 'toshiya_sawaki';
    default:
      return null;
  }
};

export const setMember = (name: string) => {
  const n = convertMember(name);
  if (n === null) return;

  localStorage.setItem('MEMBER_NAME', n);
};
