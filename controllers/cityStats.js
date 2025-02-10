import db from '../config/database.js';

export default async function getCities(){

    try {
        return await db('cities')
        .leftJoin('spots', 'cities.id', 'spots.city')
        .andWhere('spots.approved', true)
        .select('cities.id', 'cities.name', 'cities.cover')
        .count('spots.id as spots_count')
        .groupBy('cities.id')   
    } catch (error) {
        console.error("Error fetching city stats:", error);
        throw new Error('Error fetching city stats');
    }
    
}

export async function getCityStats(city){
    city = city.toLowerCase();
    return await db('cities').where('name', city).select('*');
}