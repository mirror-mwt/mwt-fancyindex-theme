### Zotero

I have a mirror of the Debian/Ubuntu repository for the [Zotero citation manager](https://www.zotero.org). My mirror uses the same original signature as the developer. The mirror url is <https://mirror.mwt.me/zotero/deb/>. You can change this in your sources manually, or by running the following commands:

~~~sh
sudo wget -O /usr/share/keyrings/zotero-archive-keyring.gpg "https://raw.githubusercontent.com/retorquere/zotero-deb/master/zotero-archive-keyring.gpg"
sudo sh -c 'echo "deb [signed-by=/usr/share/keyrings/zotero-archive-keyring.gpg by-hash=force] https://mirror.mwt.me/zotero/deb/ ./" > /etc/apt/sources.list.d/zotero.list'
sudo apt-get update
~~~

Alternatively, you can do this in one line with:

~~~sh
curl -sL https://raw.githubusercontent.com/retorquere/zotero-deb/master/install.sh | sudo bash /dev/stdin "https://mirror.mwt.me/zotero/deb"
~~~
