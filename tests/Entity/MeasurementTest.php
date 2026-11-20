<?php

namespace App\Tests\Entity;

use PHPUnit\Framework\TestCase;
use App\Entity\Measurement;
use PHPUnit\Framework\Attributes\DataProvider;

class MeasurementTest extends TestCase
{

#[DataProvider('dataGetFahrenheit')]
    public function testGetFahrenheit(
        string $celsius,
        string $expectedFahrenheit
    ): void {
        $measurement = new Measurement();
        $measurement->setCelsius($celsius);

        $this->assertEquals(
            $expectedFahrenheit,
            $measurement->getFahrehneit()
        );
    }

    public static function dataGetFahrenheit(): array
    {
        return [
            ['0', '32'],
            ['-100', '-148'],
            ['100', '212'],
            ['20', '68'],
            ['37', '98.6'],
            ['-40', '-40'],
            ['25', '77'],
            ['150', '302'],
            ['0.5', '32.9'],
            ['50', '122'],
        ];
    }
}
