export const NAME_ERROR_MESSAGE = {
  EMPTY: '닉네임을 입력해주세요.',
  INVALID_LENGTH: '닉네임은 최대 10자까지 가능합니다.',
  HAS_SPACE: '닉네임에는 공백을 포함할 수 없습니다.',
  INVALID_CHAR: '한글, 영문, 숫자, -, _ 만 사용할 수 있습니다.',
};

function isEmpty(name) {
  return name.length === 0;
}

function isInvalidLength(name) {
  return name.length > 10;
}

function hasSpace(name) {
  return /\s/.test(name);
}

function hasInvalidChars(name) {
  const regex = /^[ㄱ-ㅎ가-힣A-Za-z0-9\-_]+$/;
  return !regex.test(name);
}

export function validatePlayerName(inputName) {
  const playerName = inputName.trim();

  if (isEmpty(playerName)) {
    return { isValid: false, errorMessage: NAME_ERROR_MESSAGE.EMPTY };
  }
  if (hasSpace(playerName)) {
    return { isValid: false, errorMessage: NAME_ERROR_MESSAGE.HAS_SPACE };
  }
  if (isInvalidLength(playerName)) {
    return { isValid: false, errorMessage: NAME_ERROR_MESSAGE.INVALID_LENGTH };
  }
  if (hasInvalidChars(playerName)) {
    return { isValid: false, errorMessage: NAME_ERROR_MESSAGE.INVALID_CHAR };
  }

  return {
    isValid: true,
    playerName,
  };
}
