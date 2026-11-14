<?php
declare(strict_types=1);

namespace App\Service;

use App\Entity\Location;
use App\Repository\MeasurementRepository;

class WeatherUtil
{
    public function __construct(
        private MeasurementRepository $measurementRepository
    ) {
    }

    public function getWeatherForLocation(Location $location): array
    {
        return $this->measurementRepository->findByLocation($location);
    }

    public function getWeatherForCountryAndCity(string $countryCode, string $city): array {    
            return $this->measurementRepository->findByCountryCity($countryCode,$city);
    }
}