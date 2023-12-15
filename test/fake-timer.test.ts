import {test,expect} from 'vitest'
import handler from '@/pages/api/e2e-fake-server-time'

test('useFakeTimers is not called for production',()=>{
    // --- todo
    expect(1).toBe(11)
})

test('useFakeTimers is called for locallhost only',()=>{
    // --- todo
    expect(1).toBe(11)
})