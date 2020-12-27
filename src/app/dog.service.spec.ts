import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Dog, DogService } from "./dog.service";
import { Type } from "@angular/core";

export const mockDog: Dog = {
    message: 'https://images.dog.ceo/breeds/hound-basset/n02088238_9815.jpg',
    status: 'success'
};

describe('DogService', () => {
    let httpTestingController: HttpTestingController;
    let service: DogService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DogService],
            imports: [HttpClientTestingModule]
        });
        httpTestingController = TestBed.inject(HttpTestingController as Type<HttpTestingController>);
        service = TestBed.inject(DogService as Type<DogService>);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('random should provide data', () => {
        service.randomDog().subscribe((dog: Dog) => {
            expect(dog).not.toBe(null);
            expect(JSON.stringify(dog)).toEqual(JSON.stringify(mockDog));
        });
        const req = httpTestingController.expectOne(`https://dog.ceo/api/breeds/image/random`);
        req.flush(mockDog);
    });
})
