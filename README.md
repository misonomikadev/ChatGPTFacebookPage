
## 1. Prerequisites:
- A Facebook Fanpage. If you don't have one, you can create it [here](https://www.facebook.com/pages/creation/).
- If you haven't downloaded Node.JS, you can get it [here](https://www.nodejs.org/).
- Once you have a Fanpage, visit [Facebook Developers](https://developers.facebook.com/) (if you don't have an account, please create one :>), then navigate to [My Apps](https://developers.facebook.com/apps/). If you don't have an app, create one (if you don't know how, I'll guide you in the next section :>) and then select your App.
- ChatGPT API Token, obtain it [here](https://platform.openai.com/account/api-keys).

## 2. How to create an App:
- Refer to section 1 if you're unsure about the creation process. Otherwise, you can skip this.
- Click on **[create App](https://developers.facebook.com/apps/creation/)** -> Other -> None -> Enter your app's name and click "Create App" :>

## 3. Instructions:
- Clone the source code:
```sh
git clone https://github.com/Tungchaphet/ChatGPTFacebookPage.git
cd ChatGPTFacebookPage
```
- Install the necessary npm libraries:
```sh
npm install
```
- Run the command **npm start** in the terminal. Once you see **App running at port: {port}**, don't close it:
- After creating the App in section 2, look for **Add a product**, find **Messenger**, and click **Set up**. This will create a **Messenger Product** for you.
- Locate the **Access Token** in the **Messenger Product** as shown in the image:

![Texto alternativo](https://github.com/misonomikadev/ChatGPTFacebookPage/blob/main/assets/access_tokens.png)

- Click on **Add or remove Pages**:
- Choose the page you want to integrate and click **Done**.
- Click **Generate token**:

![Texto alternativo](https://github.com/misonomikadev/ChatGPTFacebookPage/raw/main/assets/page.png)

- Check **I Understand** and copy the token to place in the **config.js** file (do not expose or share this token; if you're using Replit, save it as a Secret :>).

```sh
// config.js
const NodeCache = require("node-cache")

const config = {
    pageToken: '', // Đưa token của fanpage của bạn vô đây.
    appSecret: '', // Cái này có thể có hoặc không, nếu có thì nó càng bảo mật.
    verifyToken: '', // Nhập cái gì vô đây cũng được nhưng nhớ copy vào Verify Token ở mục Webhooks.
    openai: {
        model: '', // Model ChatGPT (gpt-3-turbo, gpt-3, gpt-4)
        token: '', // API Token của ChatGPT
        max_tokens: 2048 // Bạn có thể thay đổi theo bạn muốn.
    },
    mode: 'CHAT', // Chuyển thành IMAGE nếu bạn muốn bot tạo ảnh.
    baseURL: 'https://graph.facebook.com/v16.0',
    ratelimit: new Map(),
    cache: new NodeCache({
        checkperiod: 10000,
        deleteOnExpire: true
    }),
    port: 5500
}

module.exports = config
```
- Navigate to **Webhooks** and click **Add Callback URL**.
- Retrieving the Callback URL is covered in section 4. Once obtained, paste it into the Callback URL input and add **/webhooks** to the end.
- For the **Verify token**, you can enter any value, but remember to add it to **config.js** before clicking **Verify and save** (and don't expose it to others).
- After clicking **Verify and save** and if you see **Webhooks Verified** in the terminal, you've successfully set it up.
- Grant page permissions to your App: Click **Add subscriptions** and check **messages**. You're done.
- Now you can chat with the Page :>

## 4. Retrieve Callback URL:
- This is crucial as Facebook sends user message events via [Webhooks](https://en.wikipedia.org/wiki/Webhook).
- If you cloned the source code in Replit, just click **Run** to view your Repl's web address, and you can continue. If not, keep reading :>
- **[Using ngrok](https://ngrok.com/)**: After logging in (or creating an account), download it (remember not to close the website after downloading :>).

![Texto alternativo](https://github.com/misonomikadev/ChatGPTFacebookPage/raw/main/assets/ngrok.png)

- Once downloaded and extracted, you'll find **ngrok.exe**. Launch it, return to the ngrok website, and copy-paste the command from **Connect your account** into the terminal opened by ngrok.
- Enter the following command:
```sh
ngrok http 5500
```
- Once the display matches a specific image, copy a URL (do not close this terminal).

![Texto alternativo](https://github.com/misonomikadev/ChatGPTFacebookPage/raw/main/assets/ngrok1.png)

- Paste the URL into the Callback URL input and add **/webhooks**:

![Texto alternativo](https://github.com/misonomikadev/ChatGPTFacebookPage/raw/main/assets/webhooks.png)

- After clicking **Verify and save** and if you see **Webhooks Verified** in the terminal, you've successfully set it up.

## 5. Support:
- Discord: https://discord.gg/f7xUdhJ3j8
