import { convertMember } from 'helper/member';

test('member auth is failed', () => {
  expect(convertMember('テスト')).toBeNull();
});
