import {Entity} from "../xmlToEntities";
import {capitalize} from "../utils";

export function generateRepository(entity: Entity){
    const entityType = capitalize(entity.name);

    return `<?php

namespace App\\Repository;

use App\\Entity\\${entityType};
use Doctrine\\Bundle\\DoctrineBundle\\Repository\\ServiceEntityRepository;
use Doctrine\\Persistence\\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<${entityType}>
 */
class ${entityType}Repository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ${entityType}::class);
    }
    
    public function getRandomElement(){
        $elements = $this->findBy([]);
        $count = count($elements);
        if ($count === 0) {
            return null;
        }
        return $elements[random_int(0, $count - 1)];
    }
}`
}