### GitHub Desktop

There is an [unofficial Linux version](https://github.com/shiftkey/desktop) of the [official GitHub Desktop client](https://desktop.github.com/). This is the primary official mirror for the project. The following commands can be used to install the repository.

**Debian/Ubuntu:** First install our GPG certificate:

~~~sh
sudo wget -O /etc/apt/trusted.gpg.d/shiftkey-desktop.asc "https://mirror.mwt.me/ghd/gpgkey"
~~~

To setup the package repository, run:

~~~sh
echo "deb [arch=amd64] https://mirror.mwt.me/ghd/deb/ any main" | sudo tee /etc/apt/sources.list.d/packagecloud-shiftkey-desktop.list
~~~

Then install GitHub Desktop:

~~~sh
sudo apt update && sudo apt install github-desktop
~~~

**Red Hat/CentOS/Fedora distributions:** First install our GPG certificate:

~~~sh
$ sudo rpm --import https://mirror.mwt.me/ghd/gpgkey
~~~

To setup the package repository:

~~~sh
cat << EOF | sudo tee /etc/yum.repos.d/shiftkey-desktop.repo
[shiftkey]
name=GitHub Desktop
baseurl=https://mirror.mwt.me/ghd/rpm
enabled=1
gpgcheck=0
repo_gpgcheck=1
gpgkey=https://mirror.mwt.me/ghd/gpgkey
EOF
~~~

Then install GitHub Desktop:

~~~sh
# if yum is your package manager
$ sudo yum install github-desktop

# if dnf is your package manager
$ sudo dnf install github-desktop
~~~

**OpenSUSE distribution:** First install our GPG certificate:

~~~sh
$ sudo rpm --import https://mirror.mwt.me/ghd/gpgkey
~~~

To setup the package repository:

~~~sh
cat << EOF | sudo tee /etc/zypp/repos.d/shiftkey-desktop.repo
[shiftkey]
name=GitHub Desktop
baseurl=https://mirror.mwt.me/ghd/rpm
enabled=1
gpgcheck=0
repo_gpgcheck=1
gpgkey=https://mirror.mwt.me/ghd/gpgkey
EOF
~~~

Then install GitHub Desktop:

~~~sh
# if zypper is your package manager
$ sudo zypper ref && sudo zypper in github-desktop
~~~
