<?php

namespace App\Command;

use Symfony\Component\Console\Attribute\Argument;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Style\SymfonyStyle;
use App\Repository\LocationRepository;
use App\Service\WeatherUtil;
use App\Entity\Measurement;
#[AsCommand(
    name: 'weather:code:city',
    description: 'Add a short description for your command',
)]
class WeatherCodeCityCommand{
    public function __construct(
        private LocationRepository $locationRepository,
        private WeatherUtil $weatherUtil
    ) {
    
    }
    public function __invoke(
        SymfonyStyle $io,
        #[Argument('Country code')] string $code,
        #[Argument('City name')] string $city,
    ): int {
        $measurements = $this->weatherUtil->getWeatherForCountryAndCity($code, $city);
        $rows = [];
        foreach ($measurements as $val) {
            $rows[] = [
                $val['date']->format('Y-m-d'),
                $val['celsius']
            ];
        }
        $io->table(['date', 'celsius'], $rows);
    
        return Command::SUCCESS;
    }
}
