import { UserDto } from '../user/user.dto';
import { User } from '../user/user.entity';

export const userEntityToClass = (userData: User): UserDto => {
  const { id, name, email } = userData;
  return { id, name, email } as UserDto;
};

export const getMailTemplate = (content: string): string => {
  return `
    <table style='font-family:Arial,sans-serif;border-collapse:collapse;border-spacing:0;table-layout:fixed;width:100%;background-color:#f3f2f1;'>
      <tbody>
      <tr>
        <td style='margin:0;padding:0;text-align:center;'>
          <table style='height:120px;width:100%;background-color:#2d5bb2;'>
            <tbody>
            <tr>
              <td>
                <div style='max-width:600px;height:70px;margin:0 auto;padding:0 15px;text-align:left;box-sizing:border-box;'>
                  <img style='height:100%;vertical-align:middle;' src='https://expooze.herokuapp.com/apple-icon-180x180.png' alt='Expooze' />
                  <span style='display:inline-block;vertical-align:middle;margin:0 0 0 15px;font-size:42px;font-weight:600;color:#edf3f4;'>
                    Expooze
                  </span>  
                </div>
              </td>
            </tr>
            </tbody>
          </table>
          <table style='border-collapse:collapse;border-spacing:0;table-layout:fixed;width:100%;'>
            <tbody>
            <tr>
              <td>
                ${content}
              </td>
            </tr>
            </tbody>
          </table>
        </td>
      </tr>
      </tbody>
    </table>
  `;
};

export const getResetPasswordMailTemplate = (
  forgottenPasswordUrl: string,
): string => {
  return getMailTemplate(`
    <table style='width:600px;max-width:90%;margin:0 auto;padding:50px 0 15px;background:#ffffff;border-radius:3px;'>
      <tbody>
      <tr>
        <td style='color:#4870c0;font-size:32px;font-weight:600;padding:10px 0 35px;margin:-65px auto 0;'>
          Trouble signing in?
        </td>
      </tr>
      <tr>
        <td style='color:#6d7381;font-size:16px;line-height:22px;padding:15px 0;'>
          <p style='text-align:justify;padding:0 20px;max-width:465px;margin:0 auto;'>
            Resetting your password is easy. Just press the button below and follow the instructions. We'll have
            you up and running in no time.
          </p>
        </td>
      </tr>
      <tr>
        <td style='padding:25px 0;'>
          <a 
            href='${forgottenPasswordUrl}'
            style='display:inline-block;color:#ffffff;text-align:center;text-decoration:none;background:#4870c0;border:1px solid #4870c0;border-radius:2px;box-shadow:0 0 6px 0 rgba(0, 0, 0, 0.1);box-sizing:border-box;cursor:pointer;font-size:20px;padding:10px 25px;'>
            Reset password
          </a>
        </td>
      </tr>
      </tbody>
    </table>
    <table style='margin: 0 auto;'>
      <tbody>
      <tr>
        <td style='padding:0 30px;font-size:14px;text-align:left;color:#979ca9;line-height:20px;'>
          <p>
            If you didn't mean to reset your password, then you can just ignore this email.
            <br />
            Your password will not change.
          </p>
          <p>
            Cheers, <strong>team Expooze</strong>!
          </p>
        </td>
      </tr>
      </tbody>
    </table>
  `);
};
