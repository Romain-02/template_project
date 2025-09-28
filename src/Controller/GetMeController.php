<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\SerializerInterface;

class GetMeController extends AbstractController
{

    public function __construct(
        private TokenStorageInterface $tokenStorage,
        private SerializerInterface $serializer
    )
    {

    }

    #[Route(path: "/api/user/get-me", name: "get-me", methods: ["GET"])]
    public function getMe(): JsonResponse
    {
        $user = $this->tokenStorage->getToken()->getUser();
        if($user instanceof UserInterface){
            $serializedUser = $this->serializer->serialize($user, 'json', ['groups' => ['user:read']]);

            return JsonResponse::fromJsonString($serializedUser, 200);
        }
        return new JsonResponse(["error" => "User not found"], 404);
    }
}
