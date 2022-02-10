import { EmailNotify } from './EmailNotify';

describe('Email Notify Test suite', () => {
  const emailNotify = new EmailNotify();

  afterEach(async () => jest.restoreAllMocks());
  test('It should send an email of alert', () => {
    jest.spyOn(EmailNotify.prototype as any, 'getTransporter').mockImplementation(() => ({
      sendMail: (_data: any) => null,
    }));
    const email = 'joe@email.com';

    expect(emailNotify.alert(email)).resolves.not.toThrow();
  });
});
