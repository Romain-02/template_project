<?php

namespace App\Controller;

use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use LogicException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    #[Route(path: "/login", name: "app_login")]
    public function login(
        SessionInterface $session,
        AuthenticationUtils $authenticationUtils,
        TokenStorageInterface $tokenStorage,
        JWTTokenManagerInterface $JWTTokenManager
    ): Response
    {

        if ($tokenStorage->getToken() !== null) {

            $user = $tokenStorage->getToken()->getUser();

            $token = $JWTTokenManager->create($user);

            // Stocker le token dans la session
            $session->set('jwt_token', $token);

            return $this->redirectToRoute("api_doc");
        }

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render("login/login.html.twig", ["last_username" => $lastUsername, "error" => $error]);
    }

    #[Route(path: "/logout", name: "app_logout")]
    public function logout(): void
    {
        throw new LogicException("This method can be blank - it will be intercepted by the logout key on your firewall.");
    }

    #[Route("/login_check", name: "login_check")]
    public function check(): never
    {
        throw new LogicException("This code should never be reached");
    }
}
