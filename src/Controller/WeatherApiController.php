<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpKernel\Attribute\MapQueryParameter;
use App\Service\WeatherUtil;
use App\Entity\Measurement;

final class WeatherApiController extends AbstractController
{
    #[Route('/api/v1/weather', name: 'app_weather_api')]
    public function index(#[MapQueryParameter] string $country,#[MapQueryParameter] string $city, #[MapQueryParameter] string $format, #[MapQueryParameter] bool $twig,WeatherUtil $util): Response
    {
        $measurements = $util->getWeatherForCountryAndCity($country,$city);
        $results = array_map(fn(Measurement $m) => [
            'date' => $m->getDate()->format('Y-m-d'),
            'celsius' => $m->getCelsius(),
            'fahrenheit' => $m->getFahrehneit(),
        ], $measurements);

        switch($format){
            case 'json':
                if($twig){
                    return $this->render('weather_api/index.json.twig',[
                        'json' => $results
                    ]);
                }else{
                    return $this->json($results);
                }
            case 'csv':
                $csv = "city,country,date,celcius,fahrenheit\n";
                foreach($results as $val){
                    $csv = $csv . "{$city},{$country},{$val['date']},{$val['celsius']},{$val['fahrenheit']}\n"; 
                }
                if($twig){
                    return $this->render('weather_api/index.csv.twig',[
                        'csv' => $csv
                    ]);
                }else{
                    return new Response($csv,Response::HTTP_OK,['Content-Type' => 'text/plain; charset=UTF-8',]);
                }
            default:
                return $this->json($results);
                
        }
        return $this->json($results);
    }
}
