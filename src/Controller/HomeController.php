<?php

namespace App\Controller;

use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

final class HomeController extends AbstractController
{
    #[Route("/", name: "app_home")]
    public function index(
        TokenStorageInterface    $tokenStorageInterface,
        JWTTokenManagerInterface $jwtManager
    ): Response
    {
        $token = '';
        if ($this->getUser()) {
            $token = $jwtManager->create($tokenStorageInterface->getToken()->getUser());
        }

        return $this->render("home/index.html.twig", ['token' => $token]);
    }
}
