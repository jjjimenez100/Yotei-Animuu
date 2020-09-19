# `@yotei-animuu/cli`
[![NPM](https://nodei.co/npm/@yotei-animuu/cli.png)](https://npmjs.org/package/@yotei-animuu/cli)
## Description
> CLI application for downloading anime torrents at nyaa.si

## Installation
You'll have to install the CLI app through npm first:
```npm
npm install -g @yotei-animuu/cli
```

## Usage
Open up a new terminal window and execute:
```bash
yotei-animuu
```

You'll be directed to the main screen and prompted to enter your search query
![Main Screen](https://scontent.fcrk1-2.fna.fbcdn.net/v/t1.15752-9/119939864_628920021141153_4350009007821751657_n.png?_nc_cat=106&_nc_sid=b96e70&_nc_eui2=AeFgfGfSPNsfPkdaKBlLSdB927VYUt1msSzbtVhS3WaxLHvXx-vHo5HW6M8HQ83UASAVcByvPuf3WHr4dBwXVM6m&_nc_ohc=VrezWVO_OOEAX8hKBn_&_nc_ht=scontent.fcrk1-2.fna&oh=a905592dbcc96a00c76e49017d7bab5b&oe=5F8AB29E)

Note that search results shown are limited to 20. You can select a specific torrent by navigating through the up and down arrows and pressing enter.
![Anime Choices](https://scontent.fcrk1-1.fna.fbcdn.net/v/t1.15752-9/119706672_3035657806540919_2716769357291737189_n.png?_nc_cat=100&_nc_sid=b96e70&_nc_eui2=AeGFA6mc2jXNVaf2fWQYYf_ZDfkRLzwXCQ0N-REvPBcJDcvuEDoNgC8xUsidOIYSFTB1aVopOInEbtO-7FT1U6m_&_nc_ohc=D4Oy3hz7BvQAX-Kkg2B&_nc_ht=scontent.fcrk1-1.fna&oh=96ed4f74b5082feab4178475497137a7&oe=5F8B455F)

After selecting the torrent of your choice, you are updated with the progress of the download:
![Download Progress](https://scontent.fcrk1-1.fna.fbcdn.net/v/t1.15752-9/119732038_1181085452278600_4198707295916439507_n.png?_nc_cat=103&_nc_sid=b96e70&_nc_eui2=AeGuKReFWGxtv10WPqzsqSS1CIYABxSgTwYIhgAHFKBPBg7j1imtjEhBtbj2MGkm5OQ3jHkXBMfrUi1h5j9YNJhC&_nc_ohc=dKJX5d7VR8QAX9_VvbY&_nc_ht=scontent.fcrk1-1.fna&oh=cf2d22e5ac1da35426a3a883eb3fd866&oe=5F8A5D2C)

The CLI app automatically exists upon finishing the download.
![Download Completed](https://scontent.fcrk1-1.fna.fbcdn.net/v/t1.15752-9/119521484_3333595860038419_2959575329921975943_n.png?_nc_cat=104&_nc_sid=b96e70&_nc_eui2=AeH6t3VnY_8zu-wx0JhEd3Y7E0-YQbRpCJUTT5hBtGkIlfxkzZgoyCO1j11JWzr3Gom7fgKc4Xs-aoaeKdy71GYB&_nc_ohc=aaOhX4eBevIAX-kdhAW&_nc_ht=scontent.fcrk1-1.fna&oh=25c9da3673bff2d20cb1b0b86eaa9c6c&oe=5F8BCADE)

## Notes
* Any downloading related issues should be reported and tagged with [@yoteii-animuu/core](https://www.npmjs.com/package/@yotei-animuu/core), as this is only an interface.
* The CLI app uses an external npm dependency ([downloads-folder](https://www.npmjs.com/package/downloads-folder)) that automatically identifies the user's download folder location, regardless of what specific OS is being used.

## Contributions
* This is the only interface of [@yoteii-animuu/core](https://www.npmjs.com/package/@yotei-animuu/core) at the moment. In the future, I'm planning on building an HTTP API for serving contents from the core, and using a front-end web app for displaying contents to the user. Probably scheduling downloads at a later time, streaming content, and etc. If you ever have any ideas, or have some time to spare to contribute to the project, feel free to do so. Just open up an issue/pull request and tag me :)