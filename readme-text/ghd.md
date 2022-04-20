### GitHub Desktop

There is an [unofficial Linux version](https://github.com/shiftkey/desktop) of the [official GitHub Desktop client](https://desktop.github.com/). This is the primary official mirror for the project. The following commands can be used to install the repository.

**Debian/Ubuntu:**
The mirror url is <https://mirror.mwt.me/ghd/deb/>. You can change this in your sources manually, or by running the following commands:

~~~sh
wget -qO - https://mirror.mwt.me/ghd/gpgkey | sudo tee /etc/apt/trusted.gpg.d/shiftkey-desktop.asc > /dev/null
sudo sh -c 'echo "deb [arch=amd64] https://mirror.mwt.me/ghd/deb any main" > /etc/apt/sources.list.d/packagecloud-shiftkey-desktop.list'
sudo apt-get update
~~~

**Red Hat/CentOS/Fedora:**
The mirror url is <https://mirror.mwt.me/ghd/rpm/>. You can change this in your sources manually, or by running the following commands:

~~~sh
sudo rpm --import https://mirror.mwt.me/ghd/gpgkey
sudo sh -c 'echo -e "[shiftkey]\nname=GitHub Desktop\nbaseurl=https://mirror.mwt.me/ghd/rpm\nenabled=1\ngpgcheck=0\nrepo_gpgcheck=1\ngpgkey=https://mirror.mwt.me/ghd/gpgkey" > /etc/yum.repos.d/shiftkey-desktop.repo'
~~~

**OpenSUSE distribution:**
The mirror url is <https://mirror.mwt.me/ghd/rpm/>. You can change this in your sources manually, or by running the following commands:

~~~sh
sudo rpm --import https://mirror.mwt.me/ghd/gpgkey
sudo sh -c 'echo -e "[shiftkey]\nname=GitHub Desktop\nbaseurl=https://mirror.mwt.me/ghd/rpm\nenabled=1\ngpgcheck=0\nrepo_gpgcheck=1\ngpgkey=https://mirror.mwt.me/ghd/gpgkey" > /etc/zypp/repos.d/shiftkey-desktop.repo'
~~~
