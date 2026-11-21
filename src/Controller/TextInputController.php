<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Form\Extension\Core\Type\TextType;

final class TextInputController extends AbstractController
{
    #[Route('/text/input', name: 'app_text_input')]
    public function index(Request $request): Response
    {
        $form = $this->createFormBuilder()
            ->add('submittedText', TextType::class)
            ->getForm();

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $data = $form->getData();
            return $this->render("text_input/index.html.twig",[
                'form' => $form,
                'submittedText' => $data['submittedText'],
            ]);
        }else{
            return $this->render("text_input/index.html.twig",[
                'form' => $form,
                'submittedText' => ''
            ]);
        }
    }
}
