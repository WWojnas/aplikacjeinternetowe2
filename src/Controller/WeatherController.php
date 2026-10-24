<?php

namespace App\Controller;
use App\Repository\MeasurementRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Repository\LocationRepository;

final class WeatherController extends AbstractController
{
    #[Route('/weather/{country}/{city}', name: 'app_weather')]
    public function city(string $country, string $city, MeasurementRepository $measurement_repository, LocationRepository $location_repository): Response{

        $location = $location_repository->findByCountryCity($country,$city);
        $measurements = $measurement_repository->findByLocation($location);
        return $this->render('weather/city.html.twig', [
            'controller_name' => 'WeatherController',
            'location'=> $location,
            'measurements'=> $measurements
        ]);
    }
}
