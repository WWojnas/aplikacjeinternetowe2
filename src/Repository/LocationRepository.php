<?php

namespace App\Repository;
use App\Entity\Location;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use App\Repository\LocationRepository;
use App\Repository\MeasurementRepository;
/**
 * @extends ServiceEntityRepository<Location>
 */
class LocationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Location::class);
    }

   public function findByCountryCity($country,$city): Location | null
   {
       return $this->createQueryBuilder('l')
           ->andWhere('l.country = :country')
           ->andWhere('l.city = :city')
           ->setParameter('country', $country)
           ->setParameter('city', $city)
           ->getQuery()
           ->getOneOrNullResult()
       ;
   }


   public function findById($id): Location | null
   {
       return $this->createQueryBuilder('l')
           ->andWhere('l.id = :id')
           ->setParameter('id', $id)
           ->getQuery()
           ->getOneOrNullResult()
       ;
   }
}
