import { useCallback } from "react";
import { aesCrypto, convertstr } from "@/lib/aesCrypto";

const useAesCrypto = (key = "root") => {
  const encrypt = useCallback(
    (plaintext) => {
      return aesCrypto.encrypt(convertstr(plaintext), key);
    },
    [key]
  );

  const decrypt = useCallback(
    (ciphertext) => {
      return aesCrypto.decrypt(convertstr(ciphertext), key);
    },
    [key]
  );

  return [encrypt, decrypt];
};

export default useAesCrypto;
