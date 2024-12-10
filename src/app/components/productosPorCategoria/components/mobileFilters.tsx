import { useState } from 'react'
import styles from './mobileFilters.module.scss'

interface MobileFiltersProps{
    closeComponent: () => void
    applyFilter: (min: number | undefined, max: number | undefined) => void
    setMinPrice: React.Dispatch<React.SetStateAction<number | undefined>>
    setMaxPrice: React.Dispatch<React.SetStateAction<number | undefined>>
}

const MobileFilters: React.FC<MobileFiltersProps> = ({closeComponent, applyFilter, setMinPrice, setMaxPrice}) => {
    const [minPriceInput, setMinPriceInput] = useState<string>('')
    const [maxPriceInput, setMaxPriceInput] = useState<string>('')

    const handleApplyFilters = (e: React.FormEvent) => {
        e.preventDefault()
        const min = minPriceInput ? parseFloat(minPriceInput) : undefined
        const max = maxPriceInput ? parseFloat(maxPriceInput) : undefined
        applyFilter(min, max)
        closeComponent()
    }

    return(
        <form className={styles.mobileFiltersForm} onSubmit={handleApplyFilters}>
            <div className={styles.mobileFilterContainer}>
                <p className={styles.filterContainerTitle}>Precio</p>
                <div className={styles.filterInputContainer}>
                    <input
                        className={styles.inputPriceFilter}
                        type="number"
                        placeholder='mínimo'
                        value={minPriceInput}
                        onChange={(e) => {
                            setMinPriceInput(e.target.value)
                            setMinPrice(e.target.value ? parseFloat(e.target.value) : undefined)
                        }}
                    />
                    -
                    <input
                        className={styles.inputPriceFilter}
                        type="number"
                        placeholder='máximo'
                        value={maxPriceInput}
                        onChange={(e) => {
                            setMaxPriceInput(e.target.value)
                            setMaxPrice(e.target.value ? parseFloat(e.target.value) : undefined)
                        }}
                    />
                </div>
            </div>
            <div className={styles.applyAndCloseButtonsContainer}>
                <button className={styles.applyAndCloseButtons} type='submit'>Aplicar</button>
                <button className={styles.applyAndCloseButtons} type='button' onClick={closeComponent}>Cerrar</button>
            </div>
        </form>
    )
}

export default MobileFilters