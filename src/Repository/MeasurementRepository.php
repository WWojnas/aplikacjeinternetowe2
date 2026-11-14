<?php

namespace App\Repository;
use App\Repository\MeasurementRepository;
use App\Entity\Measurement;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use App\Repository\LocationRepository;
use App\Entity\Location;

class MeasurementRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Measurement::class);
    }
    public function findByLocation(Location $location)
    {
        $qb = $this->createQueryBuilder('m');
        $qb->where('m.location = :location')
            ->setParameter('location', $location)
            ->andWhere('m.date > :now')
            ->setParameter('now', date('Y-m-d'));
    
        $query = $qb->getQuery();
        $result = $query->getResult();
        return $result;
    }
    public function findByCountryCity(String $country, String $city)
    {
        $qb = $this->createQueryBuilder('m');
    
        $qb->select('m.celsius', 'm.date')
            ->join('m.location', 'l')
            ->where('l.city LIKE :city')
            ->andWhere('l.country LIKE :country')
            ->andWhere('m.date > CURRENT_TIMESTAMP()')
            ->setParameter('city', $city)
            ->setParameter('country', $country);
    
        return $qb->getQuery()->getResult();
    }
}
