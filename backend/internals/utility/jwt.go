package utility

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt"
)

// ? Get the Secret Key
var secretKey = []byte("secret-key")
var refreshSecretKey = []byte("refresh-secret-key")

func CreateToken(username string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"username": username,
			"exp":      time.Now().Add(time.Hour * 24).Unix(),
		})

	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func VerifyToken(tokenString string) error {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return secretKey, nil
	})

	if err != nil {
		return err
	}

	if !token.Valid {
		return fmt.Errorf("invalid token")
	}

	return nil
}

func CreateRefreshToken(username string) (string, error) {
	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": username,
		"exp":      time.Now().Add(time.Hour * 24 * 7).Unix(),
	})

	refreshTokenString, err := refreshToken.SignedString(refreshSecretKey)
	if err != nil {
		return "", err
	}

	return refreshTokenString, nil
}

func VerifyRefreshToken(refreshTokenString string) (jwt.MapClaims, error) {
	refreshToken, err := jwt.Parse(refreshTokenString, func(token *jwt.Token) (interface{}, error) {
		return refreshSecretKey, nil
	})

	if err != nil {
		return nil, err
	}

	if !refreshToken.Valid {
		return nil, fmt.Errorf("invalid refresh token")
	}

	claims, ok := refreshToken.Claims.(jwt.MapClaims)
	if !ok {
		return nil, fmt.Errorf("invalid refresh token claims")
	}

	return claims, nil
}
