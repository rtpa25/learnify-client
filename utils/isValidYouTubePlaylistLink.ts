export const isValidURL = (url: string): boolean => {
  var res = url.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return res !== null;
};

// https://www.youtube.com/playlist?list=PLy_6D98if3ULEtXtNSY_2qN21VCKgoQAE

export const isValidPlayListUrl = (url: string): boolean => {
  if (!isValidURL(url)) return false;
  const urlParts = url.split('/');
  return urlParts.length > 3 && urlParts[3].startsWith('playlist');
};

export const extractPlaylistId = (url: string): string => {
  return url.split('/')[3].split('=')[1];
};
